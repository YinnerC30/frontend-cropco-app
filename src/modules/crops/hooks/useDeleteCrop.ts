import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { deleteCrop } from '../services/delete';

export const useDeleteCrop = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      toast.success(`Cultivo eliminado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación del cultivo, ${data.message}`,
      );
    },
    retry: 1,
  });
  return mutation;
};
