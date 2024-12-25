import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkCrops = async (data: BulkRecords): Promise<void> => {
  await cropcoAPI.delete(`${pathsCropco.crops}/remove/bulk`, {
    data: {
      recordsIds: data.cropsIds,
    },
  });
};

export const useDeleteBulkCrops = (): UseMutationReturn<void, BulkRecords> => {
  const queryCrop = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation = useMutation({
    mutationFn: deleteBulkCrops,
    onSuccess: () => {
      queryCrop.invalidateQueries({ queryKey: ['crops'] });
      toast.success(`Cultivos eliminados`);
    },
    onError: (error: AxiosError) => {
      const deleteError: AxiosError | any = error;
      handleError({
        error: deleteError as AxiosError,
        messagesStatusError: {},
      });
    },

    retry: 1,
  });

  return mutation;
};
