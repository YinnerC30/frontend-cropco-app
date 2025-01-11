import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';

export const deleteHarvestProcessed = async (
  id: string
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(
    `${pathsCropco.harvestsProcessed}/remove/one/${id}`
  );
};

export const useDeleteHarvestProcessed = (): UseMutationReturn<
  void,
  string
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: deleteHarvestProcessed,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['harvest'] });
      await queryClient.invalidateQueries({
        queryKey: ['crops'],
      });
      toast.success(`Cosecha procesada eliminada`);
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
