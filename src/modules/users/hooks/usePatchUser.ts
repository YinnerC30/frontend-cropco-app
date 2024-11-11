import {
  useAuthentication,
  useManageErrorApp,
} from '@/modules/authentication/hooks';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User } from '../interfaces';
import { updateUser } from '../services';
import { removeAllActions } from '../utils';

export function usePatchUser(): any {
  const navigate = useNavigate();
  const user = useAppSelector((state: any): any => state.authentication.user);
  const dispatch = useAppDispatch();
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
        toast.success(`Tu información han sido actualizada`);
      } else {
        toast.success(`Usuario actualizado`);
      }

      dispatch(removeAllActions());
      navigate('../view/all');
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      console.error(data);
      toast.error(
        `Hubo un problema durante la actualización del usuario, ${data.message}`
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
