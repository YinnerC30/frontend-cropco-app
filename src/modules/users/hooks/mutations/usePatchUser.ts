import {
  useAuthentication,
  useManageErrorApp,
} from '@/modules/authentication/hooks';
import { useAppSelector } from '@/redux/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User } from '../../interfaces';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

async function updateUser({ id, ...rest }: User): Promise<void> {
  const { data } = await cropcoAPI.patch(
    `${pathsCropco.users}/update/one/${id}`,
    rest
  );
  return data;
}

export function usePatchUser(): any {
  const navigate = useNavigate();
  const user = useAppSelector((state: any): any => state.authentication.user);

  const { updateUserActions } = useAuthentication();
  const { handleError } = useManageErrorApp();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data: any, variables: User) => {
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
      const updateError: AxiosError | any = error;
      handleError({
        error: updateError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para actualizar el usuario',
      });
    },
    retry: 1,
  });
  return mutation;
}
