import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';

export const deleteEmployee = async (id: string): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.employees}/remove/one/${id}`);
};

export const useDeleteEmployee = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['employees'] });
      await queryClient.invalidateQueries({ queryKey: ['harvest'] });
      await queryClient.invalidateQueries({ queryKey: ['work'] });
      await queryClient.invalidateQueries({
        queryKey: ['employees-top-harvests'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['employees-top-works'],
      });
      toast.success(`Empleado eliminado`);
    },
    onError: (error) => {
      handleError({
        error,
        handlers: {
          conflict: {
            message:
              'No se pudo eliminar el empleado seleccionado, revisa si tiene cosechas o trabajos pendientes de pago',
          },
        },
      });
    },
    retry: false,
  });
  return mutation;
};
