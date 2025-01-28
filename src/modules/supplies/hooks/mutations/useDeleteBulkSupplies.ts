import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const deleteBulkSupplies = async (
  data: BulkRecords
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.supplies}/remove/bulk`, {
    data: {
      recordsIds: data.suppliesIds,
    },
  });
};

export const useDeleteBulkSupplies = (): UseMutationReturn<
  void,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, BulkRecords> = useMutation({
    mutationFn: deleteBulkSupplies,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['supplies'] });
      await queryClient.invalidateQueries({ queryKey: ['supply'] });
      await queryClient.invalidateQueries({ queryKey: ['consumption'] });
      await queryClient.invalidateQueries({ queryKey: ['shopping'] });

      toast.success(`Suministros eliminados`);
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
