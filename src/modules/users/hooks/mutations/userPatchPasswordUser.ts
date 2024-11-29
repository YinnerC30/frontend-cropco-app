import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/auth/hooks';
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
  const { handleError } = useManageErrorApp();

  const mutation = useMutation({
    mutationFn: resetPasswordUser,
    onSuccess: () => {
      toast.success(`Contraseña restablecida`);
    },
    onError: (error: AxiosError) => {
      const patchPasswordError: AxiosError | any = error;

      handleError({
        error: patchPasswordError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso restablecer la contraseña del usuario',
      });
    },
    retry: 1,
  });
  return mutation;
}
