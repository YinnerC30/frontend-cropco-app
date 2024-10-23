import { useManageErrorAuthorization } from '@/modules/authentication/hooks/useManageErrorAuthorization';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { deleteUser } from '../services/deleteUser';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorAuthorization();
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`Usuario eliminado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      handleError({
        error: mutation.error as AxiosError,
        messageUnauthoraizedError: 'No tienes permiso para eliminar el usuario',
      });
      toast.error(
        `Hubo un problema durante la eliminación del usuario, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
