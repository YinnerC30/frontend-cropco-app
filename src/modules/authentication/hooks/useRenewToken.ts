import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { renewToken } from "../services/renewToken";

export const useRenewToken = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: renewToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-sesion-status"] });
    },
    onError: (error: AxiosError | any) => {
      const loginError: AxiosError | any = error;
      const { data } = loginError.response;
      console.error(
        `Hubo un problema al intentar renovar el token de la  sesión, ${data.message}`
      );
    },
    retry: 0,
  });

  return mutation;
};
