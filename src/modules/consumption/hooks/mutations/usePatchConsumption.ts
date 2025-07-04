import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ConsumptionSupplies } from '../../interfaces/ConsuptionSupplies';
import { MODULE_CONSUMPTION_PATHS } from '../../routes/pathRoutes';
import { useFormChange } from '@/modules/core/components';

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
  const { markChanges } = useFormChange();
  const mutation: UseMutationReturn<void, ConsumptionSupplies> = useMutation({
    mutationFn: updateConsumption,
    onSuccess: async () => {
      markChanges(true);
      await queryClient.invalidateQueries({ queryKey: ['consumptions'] });
      await queryClient.invalidateQueries({ queryKey: ['consumption', id] });
      await queryClient.invalidateQueries({ queryKey: ['supplies'] });
      await queryClient.invalidateQueries({ queryKey: ['supplies-with-stock'] });
      navigate(MODULE_CONSUMPTION_PATHS.ViewAll);
      toast.success(`Registro de consumo de insumo actualizado`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {},
      });
    },
    retry: false,
  });
  return mutation;
};
