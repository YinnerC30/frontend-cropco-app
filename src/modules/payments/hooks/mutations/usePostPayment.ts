import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Payment } from '../../interfaces/Payment';


export const createPayment = async (payment: Payment) =>
  await cropcoAPI.post(`${pathsCropco.payments}/create`, payment);

export const usePostPayment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPayment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['payments'] });
      await queryClient.invalidateQueries({
        queryKey: ['employee', 'pending-payments'],
      });
      toast.success(`Pago registrado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante el registro del pago, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
