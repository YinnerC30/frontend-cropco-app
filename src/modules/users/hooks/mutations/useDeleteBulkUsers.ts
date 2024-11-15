import { useManageErrorApp } from '@/modules/authentication/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { deleteBulkUsers } from '../../services';


interface DeleteBulkUsersProps {
  actionOnSuccess: () => void;
}

export const useDeleteBulkUsers = ({
  actionOnSuccess,
}: DeleteBulkUsersProps) => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: deleteBulkUsers,
    onSuccess: () => {
      actionOnSuccess();
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
