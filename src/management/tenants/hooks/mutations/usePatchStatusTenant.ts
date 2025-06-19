import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { toast } from 'sonner';

async function updateTenantStatus(id: string): PromiseReturnRecord<void> {
  return await cropcoAPI.patch(`${pathsCropco.tenants}/toggle-status/one/${id}`);
}
export function usePatchTenantStatus(): UseMutationReturn<void, string> {
  // const { handleError } = useAuthContext();

  const queryClient = useQueryClient();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: (id) => {
      const fetchUpdateStatusTenant = updateTenantStatus(id);

      toast.promise(fetchUpdateStatusTenant, {
        loading: 'Actualizando estado del inquilino...',
        success: 'El estado del inquilino ha sido actualizado con éxito.',
        error: 'Hubo un error al actualizar el estado del inquilino.',
      });

      return fetchUpdateStatusTenant;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
    onError: (error) => {
      // handleError({
      //   error,
      //   messagesStatusError: {
      //     notFound: 'No se encontro el usuario a actualizar',
      //     badRequest: 'La solicitud no es válida',
      //     unauthorized:
      //       'No tienes permisos para actualizar el estado del usuario',
      //   },
      // });
    },
    retry: false,
  });
  return mutation;
}
