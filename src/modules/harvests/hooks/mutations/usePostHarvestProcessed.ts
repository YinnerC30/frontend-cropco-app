import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responsess/UseMutationReturn';
import { HarvestProcessed } from '@/modules/harvests/interfaces/HarvestProcessed';

export const createHarvestProcessed = async (
  harvestProcessed: HarvestProcessed
): PromiseReturnRecord<void> => {
  return await cropcoAPI.post(
    `${pathsCropco.harvestsProcessed}/create`,
    harvestProcessed
  );
};

export const usePostHarvestProcessed = (): UseMutationReturn<
  void,
  HarvestProcessed
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, HarvestProcessed> = useMutation({
    mutationFn: createHarvestProcessed,
    onSuccess: async (_, variables) => {
      const id = variables.harvest?.id!;
      await queryClient.invalidateQueries({ queryKey: ['harvests_processed'] });
      await queryClient.invalidateQueries({
        queryKey: ['crops'],
      });
      await queryClient.invalidateQueries({ queryKey: ['harvest', id] });

      toast.success(`Cosecha procesada creada`);
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
