import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteTenantUserProps {
  tenantId: string;
  userId: string;
}

export const deleteTenantUser = async (
  tenantId: string,
  userId: string
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(
    `${pathsCropco.tenants}/remove/one/${tenantId}`
  );
};

export const useDeleteTenantUser = (): UseMutationReturn<
  void,
  DeleteTenantUserProps
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthTenantContext();
  const mutation: UseMutationReturn<void, DeleteTenantUserProps> = useMutation({
    mutationFn: ({ tenantId, userId }) => {
      return deleteTenantUser(tenantId, userId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tenant-users'] });
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
