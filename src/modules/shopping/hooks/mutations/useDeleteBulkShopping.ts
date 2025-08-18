import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ManageMessageBulkRemove } from '@/modules/core/helpers/ManageMessageBulkRemove';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteBulkShopping = async (
  data: BulkRecords
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.shopping}/remove/bulk`, {
    data: {
      recordsIds: data.shoppingIds,
    },
  });
};

export const useDeleteBulkShopping = (): UseMutationReturn<
  void,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, BulkRecords> = useMutation({
    mutationFn: deleteBulkShopping,
    onSuccess: async ({ status }) => {
      await queryClient.invalidateQueries({ queryKey: ['shopping'] });
      await queryClient.invalidateQueries({ queryKey: ['supplies'] });
      ManageMessageBulkRemove({
        status,
        customMessages: {
          multiStatus: 'No se pudieron eliminar algunas compras',
        },
      });
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
};
