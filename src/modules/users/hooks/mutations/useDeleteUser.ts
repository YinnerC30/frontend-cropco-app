import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/auth/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const deleteUser = async (id: string) => {
  await cropcoAPI.delete(`${pathsCropco.users}/remove/one/${id}`);
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`Usuario eliminado`);
    },
    onError: (error: AxiosError) => {
      const deleteError: AxiosError | any = error;

      handleError({
        error: deleteError,
        messageUnauthoraizedError: 'No tienes permiso para eliminar el usuario',
      });
    },
    retry: 1,
  });

  return mutation;
};
