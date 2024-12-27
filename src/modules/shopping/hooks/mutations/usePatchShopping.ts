import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { ShoppingSupplies } from '../../interfaces/ShoppingSupplies';

export const updateShopping = async (shopping: ShoppingSupplies) => {
  const { id, ...rest } = shopping;
  await cropcoAPI.patch(`${pathsCropco.shopping}/update/one/${id}`, rest);
};

export const usePatchShopping = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateShopping,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['shopping'] });
      await queryClient.invalidateQueries({ queryKey: ['shopping', id] });
      toast.success(`Compra actualizada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización de la compra, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
};
