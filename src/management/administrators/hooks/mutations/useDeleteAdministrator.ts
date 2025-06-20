import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const deleteAdministrator = async (
  id: string
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(
    `${pathsCropco.tenants}/remove/one/admin/${id}`
  );
};

export const useDeleteAdministrator = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthTenantContext();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: deleteAdministrator,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['administrators'] });
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
    retry: false,
  });

  return mutation;
};
