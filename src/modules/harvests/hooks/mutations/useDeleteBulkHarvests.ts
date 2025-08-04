import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ManageMessageBulkRemove } from '@/modules/core/helpers/ManageMessageBulkRemove';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseDeleteBulkResponse } from '@/modules/core/interfaces/responses/UseDeleteBulkResponse';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteBulkHarvests = async (
  data: BulkRecords
): PromiseReturnRecord<UseDeleteBulkResponse> => {
  return await cropcoAPI.delete(`${pathsCropco.harvests}/remove/bulk`, {
    data: {
      recordsIds: data.harvestIds,
    },
  });
};

export const useDeleteBulkHarvests = (): UseMutationReturn<
  UseDeleteBulkResponse,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<UseDeleteBulkResponse, BulkRecords> =
    useMutation({
      mutationFn: deleteBulkHarvests,
      onSuccess: async ({ status, data: { failed, success } }) => {
        await queryClient.invalidateQueries({ queryKey: ['harvests'] });
        await queryClient.invalidateQueries({
          queryKey: ['crops'],
        });
        await queryClient.invalidateQueries({
          queryKey: ['harvests-amount-year'],
        });

        ManageMessageBulkRemove({
          status,
          customMessages: {
            multiStatus:
              'No se pudieron eliminar algunas cosechas, revisa que no tengan registros pagos o registros de cosecha procesada',
          },
        });
      },
      onError: (error) => {
        handleError({
          error,
          handlers: {
            conflict: {
              message:
                'No se pudieron eliminar las cosechas seleccionadas, revisa que no tengan registros pagos o registros de cosecha procesada',
            },
          },
        });
      },

      retry: false,
    });

  return mutation;
};
