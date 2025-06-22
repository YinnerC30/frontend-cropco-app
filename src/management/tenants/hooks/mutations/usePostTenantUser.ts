import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { User } from '@/modules/users/interfaces';

async function createTenantUser(
  tenantId: string,
  user: Partial<User>
): PromiseReturnRecord<User> {
  return await cropcoAPI.post(
    `${pathsCropco.tenants}/add-tenant-user/one/${tenantId}`,
    user
  );
}

export function usePostTenantUser(
  tenantId: string
): UseMutationReturn<User, Partial<User>> {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleError } = useAuthTenantContext();
  const mutation: UseMutationReturn<User, Partial<User>> = useMutation({
    mutationFn: (user) => {
      return createTenantUser(tenantId, user);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tenant-users'] });
      // navigate('../view/all');
      toast.success(`Usuario creado`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {
          badRequest: 'La solicitud no es válida',
          unauthorized: 'No tienes permisos para crear un usuario',
        },
      });
    },
    retry: false,
  });

  return mutation;
}
