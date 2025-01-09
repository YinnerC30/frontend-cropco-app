import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Payment } from '../../interfaces/Payment';
import { useNavigate } from 'react-router-dom';
import { MODULE_PAYMENTS_PATHS } from '../../routes/pathRoutes';

export const createPayment = async (
  payment: Payment
): PromiseReturnRecord<void> =>
  await cropcoAPI.post(`${pathsCropco.payments}/create`, payment);

export const usePostPayment = (): UseMutationReturn<void, Payment> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, Payment> = useMutation({
    mutationFn: createPayment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['payments'] });
      await queryClient.invalidateQueries({
        queryKey: ['employees', 'pending-payments'],
      });
      navigate(MODULE_PAYMENTS_PATHS.ViewAll);
      toast.success(`Pago registrado`);
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
