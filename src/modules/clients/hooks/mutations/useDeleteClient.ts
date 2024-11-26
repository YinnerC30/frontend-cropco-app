import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/modules/authentication/hooks';

export const deleteClient = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.clients}/remove/one/${id}`);

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
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
        messageUnauthoraizedError: 'No tienes permiso para eliminar el cliente',
      });
    },
    retry: 1,
  });
  return mutation;
};
