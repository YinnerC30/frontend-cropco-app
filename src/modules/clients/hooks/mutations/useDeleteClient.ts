import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';

export const deleteClient = async (id: string): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.clients}/remove/one/${id}`);
};

export const useDeleteClient = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: deleteClient,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['clients'] });
      await queryClient.invalidateQueries({ queryKey: ['client'] });
      await queryClient.invalidateQueries({ queryKey: ['sales'] });
      await queryClient.invalidateQueries({ queryKey: ['sale'] });
      toast.success(`Cliente eliminado`);
    },
    onError: (error) => {
      handleError({
        error,
        handlers: {
          conflict: {
            message:
              'No se pudo eliminar el cliente seleccionado. Verifica si tiene ventas pendientes de pago antes de intentar eliminarlo.',
          },
        },
      });
    },
    retry: false,
  });
  return mutation;
};
