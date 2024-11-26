import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/modules/authentication/hooks';
import { BulkRecords } from '@/modules/core/interfaces/BulkData/BulkRecords';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkClients = async (data: BulkRecords) => {
  await cropcoAPI.delete(`${pathsCropco.clients}/remove/bulk`, {
    data: {
      recordsIds: data.clientsIds,
    },
  });
};

export const useDeleteBulkClients = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: deleteBulkClients,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success(`Clientes eliminados`);
    },
    onError: (error: AxiosError) => {
      const deleteError: AxiosError | any = error;
      handleError({
        error: deleteError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varios clientes',
      });
    },

    retry: 1,
  });

  return mutation;
};
