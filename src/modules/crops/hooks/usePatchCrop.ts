import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { updateCrop } from '../services/update';

export const usePatchCrop = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      toast.success(`Cultivo actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del Cultivo, ${data.message}`,
      );
    },
    retry: 1,
  });
  return mutation;
};
