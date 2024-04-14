import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { updateHarvest } from '../actions/update';

export const usePatchHarvest = (id:string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateHarvest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvests'] });
      queryClient.invalidateQueries({ queryKey: ['harvest',id] });
      toast.success(`Cosecha actualizada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del cosecha, ${data.message}`,
      );
    },
    retry: 1,
  });
  return mutation;
};
