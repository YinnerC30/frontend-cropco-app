import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { ShoppingSupplies } from '../../interfaces/ShoppingSupplies';

export async function createShopping(
  shoppingSupplies: ShoppingSupplies
): Promise<ShoppingSupplies> {
  return await cropcoAPI.post(
    `${pathsCropco.shopping}/create`,
    shoppingSupplies
  );
}

export const usePostShopping = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createShopping,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['shopping'] });
      toast.success(`Compra registrada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación de la compra, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
