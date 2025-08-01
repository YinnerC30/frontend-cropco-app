import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ManageMessageBulkRemove } from '@/modules/core/helpers/ManageMessageBulkRemove';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseDeleteBulkResponse } from '@/modules/core/interfaces/responses/UseDeleteBulkResponse';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteBulkCrops = async (
  data: BulkRecords
): PromiseReturnRecord<UseDeleteBulkResponse> => {
  return await cropcoAPI.delete(`${pathsCropco.crops}/remove/bulk`, {
    data: {
      recordsIds: data.cropsIds,
    },
  });
};

export const useDeleteBulkCrops = (): UseMutationReturn<
  UseDeleteBulkResponse,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<UseDeleteBulkResponse, BulkRecords> =
    useMutation({
      mutationFn: deleteBulkCrops,
      onSuccess: async ({ status, data: { failed, success } }) => {
        await queryClient.invalidateQueries({ queryKey: ['crops'] });
        await queryClient.invalidateQueries({ queryKey: ['harvest'] });
        await queryClient.invalidateQueries({ queryKey: ['work'] });
        await queryClient.invalidateQueries({ queryKey: ['sale'] });
        await queryClient.invalidateQueries({ queryKey: ['consumption'] });
        ManageMessageBulkRemove({
          status,
          customMessages: {
            multiStatus:
              'No fue posible eliminar algunos cultivos seleccionados. Verifica que no tengan stock disponible ni ventas con pagos pendientes antes de intentar eliminarlos',
          },
        });
      },
      onError: (error) => {
        handleError({
          error,
          handlers: {
            conflict: {
              message:
                'No fue posible eliminar los cultivos seleccionados. Verifica que no tengan stock disponible ni ventas con pagos pendientes antes de intentar eliminarlos',
            },
          },
        });
      },

      retry: false,
    });

  return mutation;
};
