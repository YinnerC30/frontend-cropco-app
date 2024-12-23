import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';

export const deleteClient = async (id: string): Promise<void> => {
  await cropcoAPI.delete(`${pathsCropco.clients}/remove/one/${id}`);
};

export const useDeleteClient = (): UseMutationResult<
  void,
  AxiosError,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success(`Cliente eliminado`);
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
