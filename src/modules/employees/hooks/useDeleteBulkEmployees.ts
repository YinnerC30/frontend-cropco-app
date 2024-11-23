import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/modules/authentication/hooks';
import { BulkRecords } from '@/modules/core/interfaces/BulkData/BulkRecords';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkEmployees = async (data: BulkRecords) => {
  await cropcoAPI.delete(`${pathsCropco.employees}/remove/bulk`, {
    data: {
      recordsIds: data.employeesIds,
    },
  });
};

export const useDeleteBulkEmployees = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: deleteBulkEmployees,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(`Empleados eliminados`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      handleError({
        error: mutation.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varios empleados',
      });
      toast.error(
        `Hubo un problema durante la eliminación de los empleados, ${data.message}`
      );
    },

    retry: 1,
  });

  return mutation;
};
