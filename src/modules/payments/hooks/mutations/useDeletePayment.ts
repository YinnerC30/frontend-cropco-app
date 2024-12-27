import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const deletePayment = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.payments}/remove/one/${id}`);

export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePayment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success(`Pago eliminado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación del pago, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
};
