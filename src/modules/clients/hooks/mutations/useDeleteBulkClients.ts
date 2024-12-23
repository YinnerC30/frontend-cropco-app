import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext, useManageErrorApp } from '@/auth/hooks';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkClients = async (data: BulkRecords): Promise<void> => {
  await cropcoAPI.delete(`${pathsCropco.clients}/remove/bulk`, {
    data: {
      recordsIds: data.clientsIds,
    },
  });
};

export const useDeleteBulkClients = (): UseMutationResult<
  void,
  AxiosError,
  BulkRecords,
  unknown
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
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
        messagesStatusError: {},
      });
    },

    retry: 1,
  });

  return mutation;
};
