import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { ConsumptionSupplies } from '../../interfaces/ConsuptionSupplies';

export const updateConsumption = async (consumption: ConsumptionSupplies) => {
  const { id, ...rest } = consumption;
  await cropcoAPI.patch(`${pathsCropco.consumption}/update/one/${id}`, rest);
};

export const usePatchConsumption = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateConsumption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consumptions'] });
      queryClient.invalidateQueries({ queryKey: ['consumptions', id] });
      toast.success(`Registro de consumo de insumo actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del registro de consumo de insumos, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
};
