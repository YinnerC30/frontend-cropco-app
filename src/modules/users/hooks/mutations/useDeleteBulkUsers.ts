import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ManageMessageBulkRemove } from '@/modules/core/helpers/ManageMessageBulkRemove';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteBulkUsers = async (
  data: BulkRecords
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.users}/remove/bulk`, {
    data: {
      recordsIds: data.userIds,
    },
  });
};

export const useDeleteBulkUsers = (): UseMutationReturn<void, BulkRecords> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, BulkRecords> = useMutation({
    mutationFn: deleteBulkUsers,
    onSuccess: async ({ status }) => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      ManageMessageBulkRemove({
        status,
        customMessages: {
          multiStatus:
            'No se pudieron eliminar algunos usuarios, revisa que no tengan rol "Administrador" ',
        },
      });
    },
    onError: (error) => {
      handleError({
        error,
        handlers: {
          conflict: {
            message:
              'No se pudieron eliminar los usuarios seleccionados, revisa que no tengan rol "Administrador"',
          },
        },
      });
    },
    retry: false,
  });

  return mutation;
};
