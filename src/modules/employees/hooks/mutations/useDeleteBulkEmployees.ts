import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkEmployees = async (data: BulkRecords): Promise<void> => {
  await cropcoAPI.delete(`${pathsCropco.employees}/remove/bulk`, {
    data: {
      recordsIds: data.employeesIds,
    },
  });
};

export const useDeleteBulkEmployees = (): UseMutationResult<
  void,
  AxiosError,
  BulkRecords,
  unknown
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation = useMutation({
    mutationFn: deleteBulkEmployees,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(`Empleados eliminados`);
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
