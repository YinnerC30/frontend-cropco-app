import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { updateSupply } from '../services/update';
import { Supply } from '../interfaces/Supply';

export const usePatchSupply = (): UseMutationResult<
  void,
  AxiosError<unknown, any>,
  Supply,
  unknown
> => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      toast.success(`Insumo actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del insumo, ${data.message}`,
      );
    },
    retry: 1,
  });
  return mutation;
};
