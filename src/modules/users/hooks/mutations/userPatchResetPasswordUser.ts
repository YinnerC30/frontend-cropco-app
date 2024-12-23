import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export interface DataResetPassword {
  password: string;
}

async function resetPasswordUser(id: string): Promise<DataResetPassword> {
  const { data } = await cropcoAPI.patch(
    `${pathsCropco.users}/reset-password/one/${id}`
  );
  return data;
}

export function usePatchResetPasswordUser(): UseMutationResult<
  DataResetPassword,
  AxiosError,
  string,
  unknown
> {
  const { handleError } = useAuthContext();

  const mutation = useMutation({
    mutationFn: resetPasswordUser,
    onSuccess: () => {
      toast.success(`Contraseña restablecida`);
    },
    onError: (error: AxiosError) => {
      const patchPasswordError: AxiosError = error;

      handleError({
        error: patchPasswordError as AxiosError,
        messagesStatusError: {
          notFound: 'No se encontro el usuario para restablecer su contraseña',
          unauthorized: 'No tienes permiso para restablecer la contraseña',
        },
      });
    },
    retry: 1,
  });
  return mutation;
}
