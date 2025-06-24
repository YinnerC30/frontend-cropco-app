import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { toast } from 'sonner';

async function updateAdministratorStatus(
  id: string
): PromiseReturnRecord<void> {
  return await cropcoAPI.put(
    `${pathsCropco.administrators}/toggle-status/one/${id}`
  );
}
export function usePatchAdministratorStatus(): UseMutationReturn<void, string> {
  const { handleError } = useAuthTenantContext();

  const queryClient = useQueryClient();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: (id) => {
      const fetchUpdateStatusAdministrator = updateAdministratorStatus(id);

      toast.promise(fetchUpdateStatusAdministrator, {
        loading: 'Actualizando estado del usuario...',
        success: 'El estado del usuario ha sido actualizado con éxito.',
        error: 'Hubo un error al actualizar el estado del usuario.',
      });

      return fetchUpdateStatusAdministrator;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['administrators'] });
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
