import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { updateUser } from '../services/updateUser';
import { useAuthenticationUser } from '@/modules/authentication/hooks/useAuthenticationUser';
import { useNavigate } from 'react-router-dom';
import { removeAllActions } from '../utils/userSlice';
import { User } from '../interfaces/User';

export function usePatchUser(): any {
  const navigate = useNavigate();
  const user = useAppSelector((state: any): any => state.authentication.user);
  const dispatch = useAppDispatch();
  const { updateUserActions } = useAuthenticationUser();

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
      navigate('../all');
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      console.error(data);
      toast.error(
        `Hubo un problema durante la actualización del usuario, ${data.message}`
      );
    },

    retry: 1,
  });
  return mutation;
}
