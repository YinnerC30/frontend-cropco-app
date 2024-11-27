import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/modules/authentication/hooks';

export const deleteCrop = async (id: string) => {
  return await cropcoAPI.delete(`${pathsCropco.crops}/remove/one/${id}`);
};

export const useDeleteCrop = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
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
        messageUnauthoraizedError: 'No tienes permiso para eliminar el cultivo',
      });
    },
    retry: 1,
  });
  return mutation;
};
