import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { useAuthContext } from '../useAuthContext';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const renewToken = async (): Promise<{ token: string }> => {
  const { data } = await cropcoAPI.patch(
    `${pathsCropco.authentication}/renew-token`
  );
  return data;
};

export const useRenewToken = (): UseMutationResult<
  { token: string },
  AxiosError,
  void,
  unknown
> => {
  const { updateTokenInClient, handleError } = useAuthContext();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: renewToken,
    onSuccess: ({ token }) => {
      queryClient.invalidateQueries({ queryKey: ['user-sesion-status'] });
      updateTokenInClient(token);
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
