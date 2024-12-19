import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { useAuthContext } from '../useAuthContext';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const renewToken = async () => {
  return await cropcoAPI.patch(`${pathsCropco.authentication}/renew-token`);
};

export const useRenewToken = () => {
  const { updateTokenInClient, handleError } = useAuthContext();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: renewToken,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['user-sesion-status'] });
      updateTokenInClient(data.token);
      toast.success('Tu sesión se ha extendido un poco más 😊');
    },
    onError: (error: AxiosError | any) => {
      const loginError: AxiosError | any = error;
      handleError({
        error: loginError,
        messagesStatusError: {
          unauthorized:
            'Tu sesión ha expirado, por favor vuelve a iniciar sesión',
        },
      });
    },
    retry: 0,
  });

  return mutation;
};
