import { useManageErrorAuthorization } from '@/modules/authentication/hooks/useManageErrorAuthorization';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { deleteBulkUsers } from '../services/deleteBulkUsers';

export const useDeleteBulkUsers = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorAuthorization();
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
