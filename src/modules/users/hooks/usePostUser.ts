import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { createUser } from '../services/createUser';
import { User } from '../interfaces/User';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/store';
import { removeAllActions } from '../utils/userSlice';

export function usePostUser(): UseMutationResult<
  User,
  AxiosError<unknown, any>,
  User,
  unknown
> {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('../all');
      dispatch(removeAllActions());
      toast.success(`Usuario creado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación del usuario, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
}
