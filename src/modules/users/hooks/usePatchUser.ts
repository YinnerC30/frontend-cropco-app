import { useAppSelector } from '@/redux/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { updateUser } from '../services/updateUser';

export function usePatchUser(): any {
  const user = useAppSelector((state: any): any => state.authentication.user);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });

      if (!(variables.id === user.id)) {
        toast.success(`Usuario actualizado`);
      }
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
