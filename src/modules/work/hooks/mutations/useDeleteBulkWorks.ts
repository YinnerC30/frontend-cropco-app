import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/auth/hooks';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkWorks = async (data: BulkRecords) => {
  await cropcoAPI.delete(`${pathsCropco.works}/remove/bulk`, {
    data: {
      recordsIds: data.workIds,
    },
  });
};

export const useDeleteBulkWorks = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: deleteBulkWorks,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['works'] });
      toast.success(`Trabajos eliminados`);
    },
    onError: (error: AxiosError) => {
      const deleteError: AxiosError = error;
      handleError({
        error: deleteError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varios trabajos',
      });
    },

    retry: 1,
  });

  return mutation;
};
