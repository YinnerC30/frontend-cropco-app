import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/auth/hooks';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkHarvests = async (data: BulkRecords) => {
  await cropcoAPI.delete(`${pathsCropco.harvests}/remove/bulk`, {
    data: {
      recordsIds: data.harvestIds,
    },
  });
};

export const useDeleteBulkHarvests = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: deleteBulkHarvests,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvests'] });
      toast.success(`Cosechas eliminadas`);
    },
    onError: (error: AxiosError) => {
      const deleteError: AxiosError = error;
      handleError({
        error: deleteError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varias cosechas',
      });
    },

    retry: 1,
  });

  return mutation;
};
