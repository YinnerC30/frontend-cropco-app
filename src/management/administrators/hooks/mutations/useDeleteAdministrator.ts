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
    `${pathsCropco.administrators}/remove/one/${id}`
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
        handlers: {}
      });
    },
    retry: false,
  });

  return mutation;
};
