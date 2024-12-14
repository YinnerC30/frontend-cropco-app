import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/auth/hooks';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkSales = async (data: BulkRecords) => {
  await cropcoAPI.delete(`${pathsCropco.sales}/remove/bulk`, {
    data: {
      recordsIds: data.saleIds,
    },
  });
};

export const useDeleteBulkSales = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: deleteBulkSales,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      toast.success(`Ventas eliminadas`);
    },
    onError: (error: AxiosError) => {
      const deleteError: AxiosError = error;
      handleError({
        error: deleteError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varias ventas',
      });
    },

    retry: 1,
  });

  return mutation;
};
