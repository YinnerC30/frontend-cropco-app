import { useAuthContext } from '@/auth/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User } from '../../interfaces';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';

async function createUser(user: Partial<User>): PromiseReturnRecord<User> {
  return await cropcoAPI.post(`${pathsCropco.users}/create`, user);
}

export function usePostUser(): UseMutationReturn<User, Partial<User>> {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<User, Partial<User>> = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('../view/all');
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
