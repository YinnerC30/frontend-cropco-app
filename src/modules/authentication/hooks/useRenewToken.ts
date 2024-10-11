import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { renewToken } from '../services/renewToken';
import { useAuthenticationUser } from './useAuthenticationUser';
import { toast } from 'sonner';

export const useRenewToken = () => {
  const { updateTokenInClient } = useAuthenticationUser();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: renewToken,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-sesion-status'] });
      updateTokenInClient(data.token);
      console.log(data.token);
      toast.success('Tu sesión se ha extendido un poco más 😊');
    },
    onError: (error: AxiosError | any) => {
      const loginError: AxiosError | any = error;
      const { data } = loginError.response;
      console.error(
        `Hubo un problema al intentar renovar el token de la  sesión, ${data.message}`
      );
      toast.error('No se pudo extender la sesión 😢');
    },
    retry: 0,
  });

  return mutation;
};
