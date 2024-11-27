import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/modules/authentication/hooks';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkCrops = async (data: BulkRecords) => {
  await cropcoAPI.delete(`${pathsCropco.crops}/remove/bulk`, {
    data: {
      recordsIds: data.cropsIds,
    },
  });
};

export const useDeleteBulkCrops = () => {
  const queryCrop = useQueryClient();
  const { handleError } = useManageErrorApp();
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
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varios cultivos',
      });
    },

    retry: 1,
  });

  return mutation;
};
