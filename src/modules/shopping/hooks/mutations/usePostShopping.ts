import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ShoppingSupplies } from '../../interfaces/ShoppingSupplies';
import { MODULE_SHOPPING_PATHS } from '../../routes/pathRoutes';

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
  const navigate = useNavigate();
  const mutation: UseMutationReturn<ShoppingSupplies, ShoppingSupplies> =
    useMutation({
      mutationFn: createShopping,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['shopping'] });
        navigate(MODULE_SHOPPING_PATHS.ViewAll);
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
