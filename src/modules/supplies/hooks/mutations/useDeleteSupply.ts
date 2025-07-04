import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';

export const deleteSupply = async (id: string): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.supplies}/remove/one/${id}`);
};

export const useDeleteSupply = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: deleteSupply,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['supplies'] });
      await queryClient.invalidateQueries({ queryKey: ['supply'] });
      await queryClient.invalidateQueries({ queryKey: ['consumption'] });
      await queryClient.invalidateQueries({ queryKey: ['shopping'] });
      toast.success(`Insumo eliminado`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {
          conflict: 'El insumo tiene stock disponible',
        },
      });
    },
    retry: false,
  });
  return mutation;
};
