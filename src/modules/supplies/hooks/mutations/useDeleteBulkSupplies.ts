import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ManageMessageBulkRemove } from '@/modules/core/helpers/ManageMessageBulkRemove';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseDeleteBulkResponse } from '@/modules/core/interfaces/responses/UseDeleteBulkResponse';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteBulkSupplies = async (
  data: BulkRecords
): PromiseReturnRecord<UseDeleteBulkResponse> => {
  return await cropcoAPI.delete(`${pathsCropco.supplies}/remove/bulk`, {
    data: {
      recordsIds: data.suppliesIds,
    },
  });
};

export const useDeleteBulkSupplies = (): UseMutationReturn<
  UseDeleteBulkResponse,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<UseDeleteBulkResponse, BulkRecords> =
    useMutation({
      mutationFn: deleteBulkSupplies,
      onSuccess: async ({ status, data: { failed, success } }) => {
        await queryClient.invalidateQueries({ queryKey: ['supplies'] });
        await queryClient.invalidateQueries({ queryKey: ['supply'] });
        await queryClient.invalidateQueries({ queryKey: ['consumption'] });
        await queryClient.invalidateQueries({ queryKey: ['shopping'] });

        ManageMessageBulkRemove({
          status,
          customMessages: {
            multiStatus:
              'No se pudieron eliminar algunos insumos, revisa que no tenga stock',
          },
        });
      },
      onError: (error) => {
        handleError({
          error,
          handlers: {
            conflict: {
              message:
                'No se pudieron eliminar los insumos seleccionados, revisa que no tenga stock',
            },
          },
        });
      },

      retry: false,
    });

  return mutation;
};
