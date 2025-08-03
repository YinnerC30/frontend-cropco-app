import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface DataResetPassword {
  password: string;
}

async function resetPasswordUser(
  id: string
): PromiseReturnRecord<DataResetPassword> {
  return await cropcoAPI.put(`${pathsCropco.users}/reset-password/one/${id}`);
}

export function usePutResetPasswordUser(): UseMutationReturn<
  DataResetPassword,
  string
> {
  const { handleError } = useAuthContext();

  const mutation: UseMutationReturn<DataResetPassword, string> = useMutation({
    mutationFn: resetPasswordUser,
    onSuccess: () => {
      toast.success(`Contraseña restablecida`);
    },
    onError: (error) => {
      handleError({
        error,
        handlers: {},
      });
    },
    retry: false,
  });
  return mutation;
}
