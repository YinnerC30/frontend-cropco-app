import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { Administrator } from '../../interfaces/Administrator';

async function createAdministrator(
  user: Partial<Administrator>
): PromiseReturnRecord<Administrator> {
  return await cropcoAPI.post(`${pathsCropco.administrators}/create/one`, user);
}

export function usePostAdministrator(): UseMutationReturn<
  Administrator,
  Partial<Administrator>
> {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleError } = useAuthTenantContext();
  const mutation: UseMutationReturn<
    Administrator,
    Partial<Administrator>
  > = useMutation({
    mutationFn: createAdministrator,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['administrators'] });
      navigate('../view/all');
      toast.success(`Usuario creado`);
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
}
