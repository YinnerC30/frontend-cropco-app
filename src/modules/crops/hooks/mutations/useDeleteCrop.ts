import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';

export const deleteCrop = async (id: string): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.crops}/remove/one/${id}`);
};

export const useDeleteCrop = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: deleteCrop,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['crops'] });
      await queryClient.invalidateQueries({ queryKey: ['harvest'] });
      await queryClient.invalidateQueries({ queryKey: ['work'] });
      await queryClient.invalidateQueries({ queryKey: ['sale'] });
      await queryClient.invalidateQueries({ queryKey: ['consumption'] });
      toast.success(`Cultivo eliminado`);
    },
    onError: (error) => {
      handleError({
        error,
        handlers: {
          conflict: {
            message:
              'No se pudo eliminar el cultivo seleccionado, revisa que no tenga stock disponible',
          },
        },
      });
    },
    retry: false,
  });
  return mutation;
};
