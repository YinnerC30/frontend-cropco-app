import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const deleteHarvest = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.harvests}/remove/one/${id}`);

export const useDeleteHarvest = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteHarvest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['harvests'],
      });
      queryClient.invalidateQueries({
        queryKey: ['crops-with-harvest'],
      });
      toast.success(`Cosecha eliminada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación de la cosecha, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
};
