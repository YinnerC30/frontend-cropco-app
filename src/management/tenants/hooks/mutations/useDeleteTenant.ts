import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';

export const deleteTenant = async (id: string): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.tenants}/remove/one/${id}`);
};

export const useDeleteTenant = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthTenantContext();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: deleteTenant,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tenants'] });
      toast.success(`Inquilino eliminado exitosamente`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {
          conflict:
            'El inquilino no puede ser eliminado porque tiene datos asociados',
        },
      });
    },
    retry: false,
  });
  return mutation;
};
