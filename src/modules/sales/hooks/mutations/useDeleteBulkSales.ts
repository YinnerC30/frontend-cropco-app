import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ManageMessageBulkRemove } from '@/modules/core/helpers/ManageMessageBulkRemove';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteBulkSales = async (
  data: BulkRecords
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.sales}/remove/bulk`, {
    data: {
      recordsIds: data.saleIds,
    },
  });
};

export const useDeleteBulkSales = (): UseMutationReturn<void, BulkRecords> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, BulkRecords> = useMutation({
    mutationFn: deleteBulkSales,
    onSuccess: async ({ status }) => {
      await queryClient.invalidateQueries({ queryKey: ['sales'] });
      await queryClient.invalidateQueries({ queryKey: ['crops'] });

      await queryClient.invalidateQueries({
        queryKey: ['crops'],
      });
      ManageMessageBulkRemove({
        status,
        customMessages: {
          multiStatus:
            'No se pudieron eliminar algunas ventas, revisa que no tenga pagos pendientes',
        },
      });
    },
    onError: (error) => {
      handleError({
        error,
        handlers: {
          conflict: {
            message:
              'No se pudieron eliminar las ventas seleccionados, revisa que no tenga pagos pendientes',
          },
        },
      });
    },

    retry: false,
  });

  return mutation;
};
