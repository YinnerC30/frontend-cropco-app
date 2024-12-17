import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/auth/hooks';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkPayments = async (data: BulkRecords) => {
  await cropcoAPI.delete(`${pathsCropco.payments}/remove/bulk`, {
    data: {
      recordsIds: data.PaymentIds,
    },
  });
};

export const useDeleteBulkPayments = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: deleteBulkPayments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Payments'] });
      toast.success(`Pagos eliminados`);
    },
    onError: (error: AxiosError) => {
      const deleteError: AxiosError = error;
      handleError({
        error: deleteError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varios pagos',
      });
    },

    retry: 1,
  });

  return mutation;
};
