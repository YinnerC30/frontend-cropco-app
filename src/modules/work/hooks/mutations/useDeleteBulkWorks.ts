import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['works'] });
      toast.success(`Trabajos eliminados`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {},
      });
    },

    retry: 1,
  });

  return mutation;
};
