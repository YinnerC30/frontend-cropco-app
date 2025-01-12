import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sales'] });
      await queryClient.invalidateQueries({
        queryKey: ['crops'],
      });
      toast.success(`Ventas eliminadas`);
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
