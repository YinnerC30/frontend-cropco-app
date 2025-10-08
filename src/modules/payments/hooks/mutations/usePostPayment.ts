import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Payment } from '../../interfaces/Payment';
import { useNavigate } from 'react-router-dom';
import { MODULE_PAYMENTS_PATHS } from '../../routes/pathRoutes';
import { useFormChange } from '@/modules/core/components';

export const createPayment = async (
  payment: Payment
): PromiseReturnRecord<void> =>
  await cropcoAPI.post(`${pathsCropco.payments}/create`, payment);

export const usePostPayment = (): UseMutationReturn<void, Payment> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const { markChanges } = useFormChange();
  const mutation: UseMutationReturn<void, Payment> = useMutation({
    mutationFn: createPayment,
    onSuccess: async () => {
      markChanges(false);
      await queryClient.invalidateQueries({ queryKey: ['payments'] });
      await queryClient.invalidateQueries({
        queryKey: ['employee', 'pending-payments'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['employees', 'pending-payments'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['works'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['work'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['harvests'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['harvest'],
      });
      navigate(MODULE_PAYMENTS_PATHS.ViewAll);
      toast.success(`Pago registrado`);
    },

    onError: (error) => {
      handleError({
        error,
        handlers: {},
      });
    },
    retry: false,
  });

  return mutation;
};
