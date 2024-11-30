import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Harvest } from '@/modules/harvests/interfaces/Harvest';

export const updateHarvest = async (harvest: Harvest) => {
  const { id, ...rest } = harvest;
  await cropcoAPI.patch(`${pathsCropco.harvests}/update/one/${id}`, rest);
};

export const usePatchHarvest = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateHarvest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvests'] });
      queryClient.invalidateQueries({ queryKey: ['harvest', id] });
      toast.success(`Cosecha actualizada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del cosecha, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
};
