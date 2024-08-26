import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { loginUser } from "../services/loginUser";

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-active"] });
    },
    onError: (error: AxiosError) => {
      const loginError: AxiosError | any = error;
      const { data } = loginError.response;
      console.error(
        `Hubo un problema al intentar iniciar sesión, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
