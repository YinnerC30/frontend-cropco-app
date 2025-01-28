import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const deleteBulkConsumption = async (
  data: BulkRecords
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.consumption}/remove/bulk`, {
    data: {
      recordsIds: data.consumptionIds,
    },
  });
};

export const useDeleteBulkConsumption = (): UseMutationReturn<
  void,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, BulkRecords> = useMutation({
    mutationFn: deleteBulkConsumption,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['consumptions'] });
      await queryClient.invalidateQueries({ queryKey: ['supplies'] });
      await queryClient.invalidateQueries({ queryKey: ['supplies'] });
      await queryClient.invalidateQueries({ queryKey: ['supplies-stock'] });
      toast.success(`consumos eliminados`);
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
