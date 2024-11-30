import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Harvest } from '@/modules/harvests/interfaces/Harvest';

export const createHarvest = async (harvest: Harvest) =>
  await cropcoAPI.post(`${pathsCropco.harvests}/create`, harvest);

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
        `Hubo un problema durante la creación de la cosecha, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
