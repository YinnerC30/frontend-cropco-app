import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responsess/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ShoppingSupplies } from '../../interfaces/ShoppingSupplies';
import { MODULE_SHOPPING_PATHS } from '../../routes/pathRoutes';

export const updateShopping = async (
  shopping: ShoppingSupplies
): PromiseReturnRecord<void> => {
  const { id, ...rest } = shopping;
  return await cropcoAPI.patch(
    `${pathsCropco.shopping}/update/one/${id}`,
    rest
  );
};

export const usePatchShopping = (
  id: string
): UseMutationReturn<void, ShoppingSupplies> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, ShoppingSupplies> = useMutation({
    mutationFn: updateShopping,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['shopping'] });
      await queryClient.invalidateQueries({ queryKey: ['shopping', id] });
      await queryClient.invalidateQueries({ queryKey: ['supplies'] });
      navigate(MODULE_SHOPPING_PATHS.ViewAll);
      toast.success(`Compra actualizada`);
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
