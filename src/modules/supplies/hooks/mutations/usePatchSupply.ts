import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { Supply } from '@/modules/supplies/interfaces/Supply';
import { useNavigate } from 'react-router-dom';
import { MODULE_SUPPLIES_PATHS } from '../../routes/pathRoutes';

export const updateSupply = async (
  supply: Supply
): PromiseReturnRecord<void> => {
  const { id, ...rest } = supply;
  return await cropcoAPI.patch(
    `${pathsCropco.supplies}/update/one/${id}`,
    rest
  );
};

export const usePatchSupply = (): UseMutationReturn<void, Supply> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, Supply> = useMutation({
    mutationFn: updateSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      navigate(MODULE_SUPPLIES_PATHS.ViewAll);
      toast.success(`Insumo actualizado`);
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
