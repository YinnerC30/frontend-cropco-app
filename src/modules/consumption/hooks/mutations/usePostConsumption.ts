import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ConsumptionSupplies } from '../../interfaces/ConsuptionSupplies';
import { useNavigate } from 'react-router-dom';
import { MODULE_CONSUMPTION_PATHS } from '../../routes/pathRoutes';

export async function createConsumption(
  shoppingSupplies: ConsumptionSupplies
): PromiseReturnRecord<ConsumptionSupplies> {
  return await cropcoAPI.post(
    `${pathsCropco.consumption}/create`,
    shoppingSupplies
  );
}

export const usePostConsumption = (): UseMutationReturn<
  ConsumptionSupplies,
  ConsumptionSupplies
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<ConsumptionSupplies, ConsumptionSupplies> =
    useMutation({
      mutationFn: createConsumption,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['consumptions'] });
        await queryClient.invalidateQueries({ queryKey: ['supplies-stock'] });
        await queryClient.invalidateQueries({ queryKey: ['supplies'] });
        navigate(MODULE_CONSUMPTION_PATHS.ViewAll);
        toast.success(`Consumo de insumo registrado`);
      },
      onError: (error) => {
        handleError({
          error,
          messagesStatusError: {},
        });
      },
      retry: 1,
    });

  return mutation;
};
