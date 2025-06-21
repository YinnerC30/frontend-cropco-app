import { RootState, useAppSelector } from '@/redux/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { Administrator } from '../../interfaces/Administrator';

import { MODULE_ADMINISTRATORS_PATHS } from '../../routes/pathsRoutes';

async function updateAdministrator({
  id,
  ...rest
}: Partial<Administrator>): PromiseReturnRecord<Administrator> {
  return await cropcoAPI.patch(
    `${pathsCropco.tenants}/update/one/admin/${id}`,
    rest
  );
}
export function usePatchAdministrator(): UseMutationReturn<
  Administrator,
  Partial<Administrator>
> {
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.authentication.user);

  const { handleError, saveTenantManagement } = useAuthTenantContext();

  const queryClient = useQueryClient();
  const mutation: UseMutationReturn<
    Administrator,
    Partial<Administrator>
  > = useMutation({
    mutationFn: updateAdministrator,
    onSuccess: async ({ data }, variables: Partial<Administrator>) => {
      await queryClient.invalidateQueries({ queryKey: ['administrators'] });
      await queryClient.invalidateQueries({
        queryKey: ['administrator', variables.id],
      });

      if (variables.id === user.id) {
        saveTenantManagement({
          ...data,
          token: user.token,
          is_login: true,
        } as any);
        await queryClient.invalidateQueries();
        toast.success(`Tu información han sido actualizada`);
      } else {
        toast.success(`Usuario actualizado`);
      }
      navigate(MODULE_ADMINISTRATORS_PATHS.ViewAll);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {
          notFound: 'No se encontro el usuario a actualizar',
          badRequest: 'La solicitud no es válida',
          unauthorized: 'No tienes permisos para actualizar el usuario',
        },
      });
    },
    retry: false,
  });
  return mutation;
}
