import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/auth/hooks';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkShopping = async (data: BulkRecords) => {
  await cropcoAPI.delete(`${pathsCropco.shopping}/remove/bulk`, {
    data: {
      recordsIds: data.shoppingIds,
    },
  });
};

export const useDeleteBulkShopping = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: deleteBulkShopping,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['shopping'] });
      toast.success(`Compras eliminadas`);
    },
    onError: (error: AxiosError) => {
      const deleteError: AxiosError = error;
      handleError({
        error: deleteError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varias compras',
      });
    },

    retry: 1,
  });

  return mutation;
};
