import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAuthContext } from '../useAuthContext';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';

interface RenewTokenResponse {
  token: string;
}

export const renewToken = async (): PromiseReturnRecord<RenewTokenResponse> => {
  return await cropcoAPI.patch(`${pathsCropco.authentication}/renew-token`);
};

export const useRenewToken = (): UseMutationReturn<
  RenewTokenResponse,
  void
> => {
  const { updateTokenInClient, handleError } = useAuthContext();

  const queryClient = useQueryClient();
  const mutation: UseMutationReturn<RenewTokenResponse, void> = useMutation({
    mutationFn: renewToken,
    onSuccess: ({ data: { token } }) => {
      queryClient.invalidateQueries({ queryKey: ['user-sesion-status'] });
      updateTokenInClient(token);
      toast.success('Tu sesión se ha extendido un poco más 😊');
    },
    onError: (error) => {
      handleError({
        error,
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
