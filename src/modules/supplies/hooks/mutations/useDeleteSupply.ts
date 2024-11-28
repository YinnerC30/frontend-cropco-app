import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/modules/authentication/hooks';

export const deleteSupply = async (id: string): Promise<void> =>
  await cropcoAPI.delete(`${pathsCropco.supplies}/remove/one/${id}`);

export const useDeleteSupply = (): UseMutationResult<
  void,
  AxiosError<unknown, any>,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: deleteSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      toast.success(`Insumo eliminado`);
    },
    onError: (error: AxiosError) => {
      const deleteError: AxiosError | any = error;
      handleError({
        error: deleteError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar un suministro',
      });
    },
    retry: 1,
  });
  return mutation;
};
