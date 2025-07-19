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
  const queryClient = useQueryClient();

  const { handleError } = useAuthTenantContext();
  const mutation: UseMutationReturn<User, Partial<User>> = useMutation({
    mutationFn: (user) => {
      return createTenantUser(tenantId, user);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tenant-users'] });
      toast.success(`Usuario creado`);
    },
    onError: (error: any) => {
      const messageResponse: any = error.response?.data?.message! || '';

      let badRequestMessage = '';

      if (messageResponse.includes('Only one admin user is allowed')) {
        badRequestMessage =
          'Solo se permite un usuario con rol "Administrador", selecciona otro.';
      } else if (
        messageResponse.includes('Unique constraint violation, Key (email)')
      ) {
        badRequestMessage =
          'El correo seleccionado esta ocupado, registra otro';
      }

      handleError({
        error,
        handlers: {
          badRequest: {
            message: badRequestMessage,
          },
        },
      });
    },
    retry: false,
  });

  return mutation;
}
