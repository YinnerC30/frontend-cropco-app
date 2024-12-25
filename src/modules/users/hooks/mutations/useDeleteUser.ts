import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const deleteUser = async (id: string): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.users}/remove/one/${id}`);
};

export const useDeleteUser = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`Usuario eliminado`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {
          notFound: 'No se encontro el usuario a eliminar',
          badRequest: 'La solicitud no es válida',
          unauthorized: 'No tienes permisos para eliminar el usuario',
        },
      });
    },
    retry: 1,
  });

  return mutation;
};
