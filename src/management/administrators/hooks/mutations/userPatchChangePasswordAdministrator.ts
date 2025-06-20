import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface DataChangePassword {
  id: string;
  old_password: string;
  new_password: string;
}

async function changePasswordAdministrator({
  id,
  ...rest
}: DataChangePassword): PromiseReturnRecord<void> {
  return await cropcoAPI.put(
    `${pathsCropco.tenants}/change-password/one/admin`,
    rest
  );
}

export function userPatchChangePasswordAdministrator(): UseMutationReturn<
  void,
  DataChangePassword
> {
  const { handleError } = useAuthTenantContext();

  const mutation: UseMutationReturn<void, DataChangePassword> = useMutation({
    mutationFn: changePasswordAdministrator,
    onSuccess: () => {
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
    retry: false,
  });
  return mutation;
}
