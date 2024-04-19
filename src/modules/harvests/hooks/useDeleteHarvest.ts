import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { deleteHarvest } from '../services/deleteHarvest';

export const useDeleteHarvest = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteHarvest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvests'] });
      toast.success(`Cosecha eliminada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación de la cosecha, ${data.message}`,
      );
    },
    retry: 1,
  });
  return mutation;
};
