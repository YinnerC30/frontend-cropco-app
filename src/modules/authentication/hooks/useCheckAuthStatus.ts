import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { checkAuthStatus } from "../services/checkAuthStatus";

export const useCheckAuthStatus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: checkAuthStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-sesion-status"] });
    },
    onError: (error: AxiosError | any) => {
      const loginError: AxiosError | any = error;
      const { data } = loginError.response;
      console.error(
        `Hubo un problema al intentar verificar la  sesión, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
