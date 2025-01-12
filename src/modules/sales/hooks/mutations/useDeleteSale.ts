import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responsess/UseMutationReturn';

export const deleteSale = async (id: string): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.sales}/remove/one/${id}`);
};

export const useDeleteSale = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: deleteSale,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sales'] });
      await queryClient.invalidateQueries({
        queryKey: ['crops'],
      });
      toast.success(`Venta eliminada`);
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
