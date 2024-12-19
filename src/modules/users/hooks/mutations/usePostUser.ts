import { useAuthContext } from '@/auth/hooks';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User } from '../../interfaces';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

async function createUser(user: User): Promise<User> {
  const { data } = await cropcoAPI.post(`${pathsCropco.users}/create`, user);
  return data;
}

type UsePostUserReturn = UseMutationResult<User, AxiosError, User, unknown>;

export function usePostUser(): UsePostUserReturn {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleError } = useAuthContext();
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('../view/all');
      toast.success(`Usuario creado`);
    },
    onError: (error: AxiosError) => {
      handleError({
        error,
        messagesStatusError: {
          badRequest: 'La solicitud no es válida',
          unauthorized: 'No tienes permisos para crear un usuario',
        },
      });
    },
    retry: 1,
  });

  return mutation;
}
