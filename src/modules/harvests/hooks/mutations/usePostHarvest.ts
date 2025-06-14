import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { Harvest } from '@/modules/harvests/interfaces/Harvest';
import { useNavigate } from 'react-router-dom';
import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';
import { useFormChange } from '@/modules/core/components';

export const createHarvest = async (
  harvest: Harvest
): PromiseReturnRecord<void> => {
  return await cropcoAPI.post(`${pathsCropco.harvests}/create`, harvest);
};

export const usePostHarvest = (): UseMutationReturn<void, Harvest> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const { markChanges } = useFormChange();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, Harvest> = useMutation({
    mutationFn: createHarvest,
    onSuccess: async () => {
      markChanges(false);
      await queryClient.invalidateQueries({
        queryKey: ['harvests'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['crops-with-harvest'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['harvests-amount-year'],
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
    retry: false,
  });

  return mutation;
};
