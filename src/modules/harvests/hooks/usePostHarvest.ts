import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { createHarvest } from '../actions/create';

export const usePostHarvest = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createHarvest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvests'] });
      toast.success(`Cosecha creada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación de la cosecha, ${data.message}`,
      );
    },
    retry: 1,
  });

  return mutation;
};
