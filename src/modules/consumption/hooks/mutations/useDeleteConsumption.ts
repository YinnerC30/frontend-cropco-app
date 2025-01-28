import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const deleteConsumption = async (
  id: string
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.consumption}/remove/one/${id}`);
};

export const useDeleteConsumption = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: deleteConsumption,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['consumptions'] });
      await queryClient.invalidateQueries({ queryKey: ['supplies'] });

      await queryClient.invalidateQueries({ queryKey: ['supplies'] });
      await queryClient.invalidateQueries({ queryKey: ['supplies-stock'] });
      toast.success(`Registro de Consumo de insumos eliminada`);
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
