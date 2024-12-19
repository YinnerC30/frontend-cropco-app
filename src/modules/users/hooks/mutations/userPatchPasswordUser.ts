import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext, useManageErrorApp } from '@/auth/hooks';
import { useMutation } from '@tanstack/react-query';
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

export function usePatchPasswordUser() {
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
