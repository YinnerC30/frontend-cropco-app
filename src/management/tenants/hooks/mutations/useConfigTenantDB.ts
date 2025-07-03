import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { toast } from 'sonner';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';

async function updateConfigTenantDB(id: string): PromiseReturnRecord<void> {
  return await cropcoAPI.put(`${pathsCropco.tenants}/config-db/one/${id}`);
}
export function useConfigTenantDB(): UseMutationReturn<void, string> {
  const { handleError } = useAuthTenantContext();

  const queryClient = useQueryClient();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: (id) => {
      const fetchUpdateStatusTenant = updateConfigTenantDB(id);

      toast.promise(fetchUpdateStatusTenant, {
        loading:
          'Actualizando configuración de la base de datos del inquilino...',
        success:
          'El configuración de la base de datos del inquilino ha sido actualizado con éxito.',
        error:
          'Hubo un error al actualizar la configuración de la base de datos del inquilino.',
      });

      return fetchUpdateStatusTenant;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tenants'] });
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
