import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface DataChangePassword {
  id: string;
  old_password: string;
  new_password: string;
}

async function changePasswordUser({
  id,
  ...rest
}: DataChangePassword): PromiseReturnRecord<void> {
  return await cropcoAPI.put(`${pathsCropco.users}/change-password/one`, rest);
}

export function userPutChangePasswordUser(): UseMutationReturn<
  void,
  DataChangePassword
> {
  const { handleError } = useAuthContext();

  const mutation: UseMutationReturn<void, DataChangePassword> = useMutation({
    mutationFn: changePasswordUser,
    onSuccess: () => {
      toast.success(`Contraseña cambiada`);
    },
    onError: (error: any) => {
      const messageResponse: any = error.response?.data?.message! || '';
      const badRequestMessage = messageResponse.includes(
        'Old password incorrect, retry'
      )
        ? 'La contraseña antigua es incorrecta'
        : 'La solicitud contiene información incorrecta';
      handleError({
        error,
        handlers: {
          badRequest: {
            message: badRequestMessage
          }
        },
      });
    },
    retry: false,
  });
  return mutation;
}
