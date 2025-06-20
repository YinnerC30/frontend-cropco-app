import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Tenant } from '@/management/tenants/interfaces/Tenant';

import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useNavigate } from 'react-router-dom';
import { MODULE_TENANTS_PATHS } from '../../routes/pathRoutes';

export const updateTenant = async (
  tenant: Tenant
): PromiseReturnRecord<void> => {
  const { id, ...rest } = tenant;
  return await cropcoAPI.put(`${pathsCropco.tenants}/update/one/${id}`, rest);
};

export const usePatchTenant = (): UseMutationReturn<void, Tenant> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthTenantContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, Tenant> = useMutation({
    mutationFn: updateTenant,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tenants'] });
      await queryClient.invalidateQueries({ queryKey: ['tenant'] });
      navigate(MODULE_TENANTS_PATHS.ViewAll);
      toast.success(`Inquilino actualizado exitosamente`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {},
      });
    },
    retry: false,
  });
  return mutation;
};
