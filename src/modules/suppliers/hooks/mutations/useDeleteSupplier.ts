import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responsess/UseMutationReturn';

export const deleteSupplier = async (id: string): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.suppliers}/remove/one/${id}`);
};

export const useDeleteSupplier = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success(`Proveedor eliminado`);
    },
    onError: (error) => {
      handleError({
        error,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varios empleados',
      });
    },
    retry: 1,
  });
  return mutation;
};
