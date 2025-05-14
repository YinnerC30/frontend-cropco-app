import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { HarvestProcessed } from '../../interfaces/HarvestProcessed';

export const updateHarvestProcessed = async (
  harvestProcessed: HarvestProcessed
): PromiseReturnRecord<void> => {
  const { id, ...rest } = harvestProcessed;
  return await cropcoAPI.put(
    `${pathsCropco.harvestsProcessed}/update/one/${id}`,
    rest
  );
};

export const usePatchHarvestProcessed = (): UseMutationReturn<
  void,
  HarvestProcessed
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, HarvestProcessed> = useMutation({
    mutationFn: updateHarvestProcessed,
    onSuccess: async (_, variables) => {
      const id = variables.harvest?.id!;
      await queryClient.invalidateQueries({ queryKey: ['harvests_processed'] });
      await queryClient.invalidateQueries({
        queryKey: ['crops'],
      });
      await queryClient.invalidateQueries({ queryKey: ['harvest', id] });
      toast.success(`Cosecha procesada actualizada`);
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
