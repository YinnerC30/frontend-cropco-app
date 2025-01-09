import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ConsumptionSupplies } from '../../interfaces/ConsuptionSupplies';
import { MODULE_CONSUMPTION_PATHS } from '../../routes/pathRoutes';

export const updateConsumption = async (
  consumption: ConsumptionSupplies
): PromiseReturnRecord<void> => {
  const { id, ...rest } = consumption;
  return await cropcoAPI.patch(
    `${pathsCropco.consumption}/update/one/${id}`,
    rest
  );
};

export const usePatchConsumption = (
  id: string
): UseMutationReturn<void, ConsumptionSupplies> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, ConsumptionSupplies> = useMutation({
    mutationFn: updateConsumption,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['consumptions'] });
      await queryClient.invalidateQueries({ queryKey: ['consumptions', id] });
      await queryClient.invalidateQueries({ queryKey: ['supplies-stock'] });
      navigate(MODULE_CONSUMPTION_PATHS.ViewAll);
      toast.success(`Registro de consumo de insumo actualizado`);
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
