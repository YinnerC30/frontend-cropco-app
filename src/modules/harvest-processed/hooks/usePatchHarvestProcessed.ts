import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { updateHarvestProcessed } from '../actions/update';

export const usePatchHarvestProcessed = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateHarvestProcessed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvests_processed'] });
      queryClient.invalidateQueries({ queryKey: ['harvest_processed', id] });
      toast.success(`Cosecha procesada actualizada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del cosecha procesada, ${data.message}`,
      );
    },
    retry: 1,
  });
  return mutation;
};
