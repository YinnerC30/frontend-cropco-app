import { useAuthContext } from '@/auth/hooks';
import { RootState, useAppSelector } from '@/redux/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User } from '../../interfaces';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { MODULE_USER_PATHS } from '../../routes/pathsRoutes';

async function updateUser({
  id,
  ...rest
}: Partial<User>): PromiseReturnRecord<User> {
  return await cropcoAPI.put(`${pathsCropco.users}/update/one/${id}`, rest);
}
export function usePatchUser(): UseMutationReturn<User, Partial<User>> {
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.authentication.user);

  const { handleError, saveUser } = useAuthContext();

  const queryClient = useQueryClient();
  const mutation: UseMutationReturn<User, Partial<User>> = useMutation({
    mutationFn: updateUser,
    onSuccess: async ({ data }, variables: Partial<User>) => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      await queryClient.invalidateQueries({ queryKey: ['user', variables.id] });

      if (variables.id === user.id) {
        saveUser({ ...data, token: user.token, isLogin: true });
        await queryClient.invalidateQueries();
        toast.success(`Tu información han sido actualizada`);
      } else {
        toast.success(`Usuario actualizado`);
      }
      navigate(MODULE_USER_PATHS.ViewAll);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {
          notFound: 'No se encontro el usuario a actualizar',
          badRequest: 'La solicitud no es válida',
          unauthorized: 'No tienes permisos para actualizar el usuario',
        },
      });
    },
    retry: false,
  });
  return mutation;
}
