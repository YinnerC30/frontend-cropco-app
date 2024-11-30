import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { HarvestProcessed } from '../../interfaces/HarvestProcessed';


export const updateHarvestProcessed = async (
  harvestProcessed: HarvestProcessed
) => {
  const { id, ...rest } = harvestProcessed;
  await cropcoAPI.patch(
    `${pathsCropco.harvestsProcessed}/update/one/${id}`,
    rest
  );
};

export const usePatchHarvestProcessed = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateHarvestProcessed,
    onSuccess: (_, variables) => {
      const { id } = variables.harvest;
      queryClient.invalidateQueries({ queryKey: ['harvests_processed'] });
      queryClient.invalidateQueries({ queryKey: ['harvest', id] });
      toast.success(`Cosecha procesada actualizada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del cosecha procesada, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
};
