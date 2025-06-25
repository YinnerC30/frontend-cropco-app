import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ManageMessageBulkRemove } from '@/modules/core/helpers/ManageMessageBulkRemove';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteBulkWorks = async (
  data: BulkRecords
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.works}/remove/bulk`, {
    data: {
      recordsIds: data.workIds,
    },
  });
};

export const useDeleteBulkWorks = (): UseMutationReturn<void, BulkRecords> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, BulkRecords> = useMutation({
    mutationFn: deleteBulkWorks,
    onSuccess: async ({ status }) => {
      await queryClient.invalidateQueries({ queryKey: ['works'] });
      ManageMessageBulkRemove({
        status,
        customMessages: {
          multiStatus:
            'No se pudieron eliminar algunos trabajos, revisa que no tengan registros pagos',
        },
      });
    },
    onError: (error) => {
      handleError({
        error,
        handlers: {
          conflict: {
            message:
              'No se pudieron eliminar los trabajos seleccionados, revisa que no tengan registros pagos',
          },
        },
      });
    },

    retry: false,
  });

  return mutation;
};
