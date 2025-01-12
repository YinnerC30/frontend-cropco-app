import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responsess/UseMutationReturn';
import { Supply } from '@/modules/supplies/interfaces/Supply';
import { useNavigate } from 'react-router-dom';
import { MODULE_SUPPLIES_PATHS } from '../../routes/pathRoutes';

export const createSupply = async (
  supply: Supply
): PromiseReturnRecord<Supply> =>
  await cropcoAPI.post(`${pathsCropco.supplies}/create`, supply);

export const usePostSupply = (): UseMutationReturn<Supply, Supply> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<Supply, Supply> = useMutation({
    mutationFn: createSupply,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      navigate(MODULE_SUPPLIES_PATHS.ViewAll);
      toast.success(`Insumo creado`);
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
