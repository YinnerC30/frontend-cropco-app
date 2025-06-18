import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';

interface RenewTokenResponse {
  token: string;
}

export const renewTenantToken =
  async (): PromiseReturnRecord<RenewTokenResponse> => {
    return await cropcoAPI.patch(`${pathsCropco.authentication}/renew-token`);
  };

export const useRenewTenantToken = (): UseMutationReturn<
  RenewTokenResponse,
  void
> => {
  // const { updateTokenInClient, handleError } = useAuthContext();

  const queryClient = useQueryClient();
  const mutation: UseMutationReturn<RenewTokenResponse, void> = useMutation({
    mutationFn: renewTenantToken,
    onSuccess: async ({ data: { token } }) => {
      await queryClient.invalidateQueries({ queryKey: ['user-sesion-status'] });
      // updateTokenInClient(token);
      toast.success('Tu sesión se ha extendido un poco más 😊');
    },
    onError: (error) => {
      // handleError({
      //   error,
      //   messagesStatusError: {
      //     unauthorized:
      //       'Tu sesión ha expirado, por favor vuelve a iniciar sesión',
      //   },
      // });
    },
    retry: false,
  });

  return mutation;
};
