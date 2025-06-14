import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const deletePayment = async (id: string): PromiseReturnRecord<void> =>
  await cropcoAPI.delete(`${pathsCropco.payments}/remove/one/${id}`);

export const useDeletePayment = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: deletePayment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['payments'] });
      await queryClient.invalidateQueries({
        queryKey: ['employee', 'pending-payments'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['employees', 'pending-payments'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['harvests'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['harvest'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['works'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['work'],
      });
      toast.success(`Pago eliminado`);
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
