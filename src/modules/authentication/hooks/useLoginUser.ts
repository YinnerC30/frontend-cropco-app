import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { loginUser } from "../services/login";

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-active"] });
      toast.success(`El usuario ha iniciado sesión`);
    },
    onError: (error: AxiosError) => {
      const loginError: AxiosError | any = error;
      const { data } = loginError.response;
      toast.error(
        `Hubo un problema al intentar iniciar sesión, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
