import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { deleteHarvestProcessed } from '../actions/delete';

export const useDeleteHarvestProcessed = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteHarvestProcessed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvests_processed'] });
      toast.success(`Cosecha procesada eliminada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación de la cosecha procesada, ${data.message}`,
      );
    },
    retry: 1,
  });
  return mutation;
};
