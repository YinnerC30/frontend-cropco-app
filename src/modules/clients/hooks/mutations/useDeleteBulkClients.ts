import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ManageMessageBulkRemove } from '@/modules/core/helpers/ManageMessageBulkRemove';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteBulkClients = async (
  data: BulkRecords
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.clients}/remove/bulk`, {
    data: {
      recordsIds: data.clientsIds,
    },
  });
};

export const useDeleteBulkClients = (): UseMutationReturn<
  void,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, BulkRecords> = useMutation({
    mutationFn: deleteBulkClients,
    onSuccess: async ({ data, status }) => {
      await queryClient.invalidateQueries({ queryKey: ['clients'] });
      await queryClient.invalidateQueries({ queryKey: ['client'] });
      await queryClient.invalidateQueries({ queryKey: ['sales'] });
      await queryClient.invalidateQueries({ queryKey: ['sale'] });
      ManageMessageBulkRemove({
        status,
        customMessages: {
          multiStatus:
            'No se pudieron eliminar algunos clientes, revisa si tienen ventas pendientes de pago antes de intentar eliminarlos.',
        },
      });
    },
    onError: (error) => {
      handleError({
        error,
        handlers: {
          conflict: {
            message:
              'No se pudo eliminar los clientes seleccionados. Verifica si tienen ventas pendientes de pago antes de intentar eliminarlos.',
          },
        },
      });
    },

    retry: false,
  });

  return mutation;
};
