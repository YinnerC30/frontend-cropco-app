import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const deleteBulkPayments = async (
  data: BulkRecords
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.payments}/remove/bulk`, {
    data: {
      recordsIds: data.paymentIds,
    },
  });
};

export const useDeleteBulkPayments = (): UseMutationReturn<
  void,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, BulkRecords> = useMutation({
    mutationFn: deleteBulkPayments,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['payments'] });
      await queryClient.invalidateQueries({
        queryKey: ['employee', 'pending-payments'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['employees', 'pending-payments'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['harvest'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['harvests'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['works'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['work'],
      });
      toast.success(`Pagos eliminados`);
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
