import { useAuthContext } from '@/auth/hooks';
import { RootState, useAppSelector } from '@/redux/store';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User } from '../../interfaces';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

async function updateUser({ id, ...rest }: Partial<User>): Promise<User> {
  const { data } = await cropcoAPI.patch(
    `${pathsCropco.users}/update/one/${id}`,
    rest
  );
  return data;
}
export function usePatchUser(): UseMutationResult<
  User,
  AxiosError,
  Partial<User>,
  unknown
> {
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.authentication.user);

  const { updateUserActions, handleError } = useAuthContext();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data: User, variables: Partial<User>) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });

      if (variables.id === user.id) {
        updateUserActions(data?.modules);
        queryClient.invalidateQueries();
        toast.success(`Tu información han sido actualizada`);
      } else {
        toast.success(`Usuario actualizado`);
      }
      navigate('../view/all');
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError = error;
      handleError({
        error: updateError as AxiosError,
        messagesStatusError: {
          notFound: 'No se encontro el usuario a actualizar',
          badRequest: 'La solicitud no es válida',
          unauthorized: 'No tienes permisos para actualizar el usuario',
        },
      });
    },
    retry: 1,
  });
  return mutation;
}
