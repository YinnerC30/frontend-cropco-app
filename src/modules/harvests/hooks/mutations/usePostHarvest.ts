import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responsess/UseMutationReturn';
import { Harvest } from '@/modules/harvests/interfaces/Harvest';
import { useNavigate } from 'react-router-dom';
import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';

export const createHarvest = async (
  harvest: Harvest
): PromiseReturnRecord<void> => {
  return await cropcoAPI.post(`${pathsCropco.harvests}/create`, harvest);
};

export const usePostHarvest = (): UseMutationReturn<void, Harvest> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, Harvest> = useMutation({
    mutationFn: createHarvest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['harvests'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['crops-with-harvest'],
      });
      navigate(MODULE_HARVESTS_PATHS.ViewAll);
      toast.success(`Cosecha creada`);
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
