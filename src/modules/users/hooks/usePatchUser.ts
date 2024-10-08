import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { updateUser } from '../services/updateUser';
import { User } from '../interfaces/User';

export function usePatchUser(): UseMutationResult<
  void,
  AxiosError<unknown, any>,
  User,
  unknown
> {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`Usuario actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del usuario, ${data.message}`,
      );
    },
    retry: 1,
  });
  return mutation;
}
