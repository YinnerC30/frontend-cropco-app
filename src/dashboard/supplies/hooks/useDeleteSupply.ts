import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { deleteSupply } from '../actions/delete';

export const useDeleteSupply = () => {
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
