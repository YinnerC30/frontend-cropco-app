import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/modules/authentication/hooks';
import { BulkRecords } from '@/modules/core/interfaces/BulkData/BulkRecords';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkUsers = async (data: BulkRecords) => {
  await cropcoAPI.delete(`${pathsCropco.users}/remove/bulk`, {
    data: {
      recordsIds: data.userIds,
    },
  });
};

export const useDeleteBulkUsers = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: deleteBulkUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`Usuarios eliminados`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      handleError({
        error: mutation.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varios usuarios',
      });
      toast.error(
        `Hubo un problema durante la eliminación de los usuarios, ${data.message}`
      );
    },

    retry: 1,
  });

  return mutation;
};
