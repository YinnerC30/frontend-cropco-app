import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { createCrop } from '../services/create';

export const usePostCrop = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      toast.success(`Cultivo creado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación del cultivo, ${data.message}`,
      );
    },
    retry: 1,
  });

  return mutation;
};
