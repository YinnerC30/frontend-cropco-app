import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';

export const createTenantDB = async (
  tenantId: string
): PromiseReturnRecord<void> => {
  return await cropcoAPI.post(
    `${pathsCropco.tenants}/create/database/${tenantId}`
  );
};

export const useCreateTenantDB = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthTenantContext();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: createTenantDB,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tenants'] });
      toast.success(`Base de datos del inquilino creado exitosamente`);
    },
    onError: (error) => {
      handleError({
        error,
        handlers: {},
      });
    },
    retry: false,
  });

  return mutation;
};
