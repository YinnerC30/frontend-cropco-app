import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { ShoppingSupplies } from '../../interfaces/ShoppingSupplies';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useAuthContext } from '@/auth';

export async function createShopping(
  shoppingSupplies: ShoppingSupplies
): PromiseReturnRecord<ShoppingSupplies> {
  return await cropcoAPI.post(
    `${pathsCropco.shopping}/create`,
    shoppingSupplies
  );
}

export const usePostShopping = (): UseMutationReturn<
  ShoppingSupplies,
  ShoppingSupplies
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<ShoppingSupplies, ShoppingSupplies> =
    useMutation({
      mutationFn: createShopping,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['shopping'] });
        toast.success(`Compra registrada`);
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
