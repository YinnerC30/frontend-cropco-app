import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { Tenant } from '@/management/tenants/interfaces/Tenant';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useNavigate } from 'react-router-dom';
import { MODULE_TENANTS_PATHS } from '../../routes/pathRoutes';

export const createTenant = async (tenant: Tenant): PromiseReturnRecord<void> => {
  return await cropcoAPI.post(`${pathsCropco.tenants}/create`, tenant);
};

export const usePostTenant = (): UseMutationReturn<void, Tenant> => {
  const queryClient = useQueryClient();
  // const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, Tenant> = useMutation({
    mutationFn: createTenant,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tenants'] });
      navigate(MODULE_TENANTS_PATHS.ViewAll);
      toast.success(`Inquilino creado exitosamente`);
    },
    onError: (error) => {
      // handleError({
      //   error,
      //   messagesStatusError: {},
      // });
    },
    retry: false,
  });

  return mutation;
}; 