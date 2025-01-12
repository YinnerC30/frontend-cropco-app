import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseMutationReturn } from '@/modules/core/interfaces/responsess/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const deleteBulkHarvests = async (
  data: BulkRecords
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.harvests}/remove/bulk`, {
    data: {
      recordsIds: data.harvestIds,
    },
  });
};

export const useDeleteBulkHarvests = (): UseMutationReturn<
  void,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation: UseMutationReturn<void, BulkRecords> = useMutation({
    mutationFn: deleteBulkHarvests,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['harvests'] });
      await queryClient.invalidateQueries({
        queryKey: ['crops'],
      });
      toast.success(`Cosechas eliminadas`);
    },
    onError: (error) => {
      handleError({
        error,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varias cosechas',
      });
    },

    retry: 1,
  });

  return mutation;
};
