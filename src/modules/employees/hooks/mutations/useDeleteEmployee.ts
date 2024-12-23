import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';

export const deleteEmployee = async (id: string): Promise<void> =>
  await cropcoAPI.delete(`${pathsCropco.employees}/remove/one/${id}`);

export const useDeleteEmployee = (): UseMutationResult<
  void,
  AxiosError,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(`Empleado eliminado`);
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
