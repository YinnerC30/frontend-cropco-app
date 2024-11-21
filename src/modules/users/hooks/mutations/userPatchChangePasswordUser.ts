import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/modules/authentication/hooks';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export interface DataChangePassword {
  id: string;
  old_password: string;
  new_password: string;
}

async function changePasswordUser({
  id,
  ...rest
}: DataChangePassword): Promise<void> {
  return await cropcoAPI.patch(
    `${pathsCropco.users}/change-password/one/${id}`,
    rest
  );
}

export function userPatchChangePasswordUser() {
  const { handleError } = useManageErrorApp();

  const mutation = useMutation({
    mutationFn: changePasswordUser,
    onSuccess: () => {
      toast.success(`Contraseña cambiada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante el cambio de la constraseña, ${data.message}`
      );
      handleError({
        error: mutation.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso cambiar la contraseña del usuario',
      });
    },
    retry: 1,
  });
  return mutation;
}
