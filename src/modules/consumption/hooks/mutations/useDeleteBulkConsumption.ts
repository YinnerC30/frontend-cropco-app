import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/auth/hooks';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkConsumption = async (data: BulkRecords) => {
  await cropcoAPI.delete(`${pathsCropco.consumption}/remove/bulk`, {
    data: {
      recordsIds: data.consumptionIds,
    },
  });
};

export const useDeleteBulkConsumption = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: deleteBulkConsumption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consumption'] });
      toast.success(`consumos eliminados`);
    },
    onError: (error: AxiosError) => {
      const deleteError: AxiosError = error;
      handleError({
        error: deleteError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varios consumos',
      });
    },

    retry: 1,
  });

  return mutation;
};
