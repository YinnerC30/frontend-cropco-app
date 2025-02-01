import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const deleteBulkEmployees = async (
  data: BulkRecords
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.employees}/remove/bulk`, {
    data: {
      recordsIds: data.employeesIds,
    },
  });
};

export const useDeleteBulkEmployees = (): UseMutationReturn<
  void,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, BulkRecords> = useMutation({
    mutationFn: deleteBulkEmployees,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['employees'] });
      await queryClient.invalidateQueries({ queryKey: ['harvests'] });
      await queryClient.invalidateQueries({ queryKey: ['harvest'] });
      await queryClient.invalidateQueries({ queryKey: ['works'] });
      await queryClient.invalidateQueries({ queryKey: ['work'] });
      await queryClient.invalidateQueries({
        queryKey: ['employees-top-harvests'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['employees-top-works'],
      });
      toast.success(`Empleados eliminados`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {},
      });
    },

    retry: 1,
  });

  return mutation;
};
