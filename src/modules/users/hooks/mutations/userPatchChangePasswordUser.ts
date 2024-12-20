import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PATH_HOME_APP } from '@/config';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
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

export function userPatchChangePasswordUser(): UseMutationResult<
  void,
  AxiosError,
  DataChangePassword
> {
  const { handleError } = useAuthContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: changePasswordUser,
    onSuccess: () => {
      navigate(PATH_HOME_APP);
      toast.success(`Contraseña cambiada`);
    },
    onError: (error: AxiosError) => {
      const patchPasswordError: AxiosError = error;
      handleError({
        error: patchPasswordError as AxiosError,
        messagesStatusError: {
          notFound: 'No se encontro el usuario a actualizar su contraseña',
          unauthorized: 'No tienes permisos para actualizar la contraseña',
        },
      });
    },
    retry: 1,
  });
  return mutation;
}
