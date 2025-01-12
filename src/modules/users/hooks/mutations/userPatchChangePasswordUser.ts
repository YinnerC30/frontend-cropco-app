import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { PATH_HOME_APP } from '@/config';
import { UseMutationReturn } from '@/modules/core/interfaces/responsess/UseMutationReturn';
import { useMutation } from '@tanstack/react-query';
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
}: DataChangePassword): PromiseReturnRecord<void> {
  return await cropcoAPI.patch(
    `${pathsCropco.users}/change-password/one/${id}`,
    rest
  );
}

export function userPatchChangePasswordUser(): UseMutationReturn<
  void,
  DataChangePassword
> {
  const { handleError } = useAuthContext();
  const navigate = useNavigate();

  const mutation: UseMutationReturn<void, DataChangePassword> = useMutation({
    mutationFn: changePasswordUser,
    onSuccess: () => {
      navigate(PATH_HOME_APP);
      toast.success(`Contraseña cambiada`);
    },
    onError: (error) => {
      handleError({
        error,
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
