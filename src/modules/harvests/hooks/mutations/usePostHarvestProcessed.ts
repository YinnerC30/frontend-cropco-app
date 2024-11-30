import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { HarvestProcessed } from '@/modules/harvests/interfaces/HarvestProcessed';

export const createHarvestProcessed = async (
  harvestProcessed: HarvestProcessed
) =>
  await cropcoAPI.post(
    `${pathsCropco.harvestsProcessed}/create`,
    harvestProcessed
  );

export const usePostHarvestProcessed = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createHarvestProcessed,
    onSuccess: (data, variables) => {
      const { id } = variables.harvest;
      queryClient.invalidateQueries({ queryKey: ['harvests_processed'] });
      queryClient.invalidateQueries({ queryKey: ['harvest', id] });

      toast.success(`Cosecha procesada creada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación de la cosecha procesada, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
