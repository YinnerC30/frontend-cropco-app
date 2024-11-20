import { useManageErrorApp } from '@/modules/authentication/hooks';
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
  return await cropcoAPI.post(`${pathsCropco.users}/create`, user);
}

export function usePostUser(): UseMutationResult<
  User,
  AxiosError<unknown, any>,
  User,
  unknown
> {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('../view/all');
      
      toast.success(`Usuario creado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación del usuario, ${data.message}`
      );
      handleError({
        error: mutation.error as AxiosError,
        messageUnauthoraizedError: 'No tienes permiso para eliminar el usuario',
      });
    },

    retry: 1,
  });

  return mutation;
}
