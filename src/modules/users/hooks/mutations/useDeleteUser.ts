import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const deleteUser = async (id: string): Promise<void> => {
  await cropcoAPI.delete(`${pathsCropco.users}/remove/one/${id}`);
};

export const useDeleteUser = (): UseMutationResult<
  void,
  AxiosError,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`Usuario eliminado`);
    },
    onError: (error: AxiosError) => {
      const deleteError: AxiosError = error;
      handleError({
        error: deleteError,
        messagesStatusError: {
          notFound: 'No se encontro el usuario a eliminar',
          badRequest: 'La solicitud no es válida',
          unauthorized: 'No tienes permisos para elimina el usuario',
        },
      });
    },
    retry: 1,
  });

  return mutation;
};
