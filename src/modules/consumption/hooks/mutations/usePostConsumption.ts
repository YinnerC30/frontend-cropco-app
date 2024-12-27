import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { ConsumptionSupplies } from '../../interfaces/ConsuptionSupplies';

export async function createConsumption(
  shoppingSupplies: ConsumptionSupplies
): Promise<ConsumptionSupplies> {
  return await cropcoAPI.post(`${pathsCropco.consumption}/create`, shoppingSupplies);
}

export const usePostConsumption = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createConsumption,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['consumptions'] });
      await queryClient.invalidateQueries({ queryKey: ['supplies'] });
      toast.success(`Consumo de insumo registrado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación del registro de consumo de insumos, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
