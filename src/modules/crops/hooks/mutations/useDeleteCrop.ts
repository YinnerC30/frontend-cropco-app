import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';

export const deleteCrop = async (id: string): Promise<void> => {
  await cropcoAPI.delete(`${pathsCropco.crops}/remove/one/${id}`);
};

export const useDeleteCrop = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation = useMutation({
    mutationFn: deleteCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      toast.success(`Cultivo eliminado`);
    },
    onError: (error: AxiosError) => {
      const deleteError: AxiosError | any = error;
      handleError({
        error: deleteError as AxiosError,
        messagesStatusError: {},
      });
    },
    retry: 1,
  });
  return mutation;
};
