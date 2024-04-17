import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { createHarvestProcessed } from '../actions/create';

export const usePostHarvestProcessed = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createHarvestProcessed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvests_processed'] });
      toast.success(`Cosecha procesada creada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación de la cosecha procesada, ${data.message}`,
      );
    },
    retry: 1,
  });

  return mutation;
};
