import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { deleteSupply } from '../services/delete';

export const useDeleteSupply = (): UseMutationResult<
  void,
  AxiosError<unknown, any>,
  string,
  unknown
> => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      toast.success(`Insumo eliminado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación del insumo, ${data.message}`,
      );
    },
    retry: 1,
  });
  return mutation;
};
