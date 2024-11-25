import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Employee } from '../../interfaces/Employee';
import { useManageErrorApp } from '@/modules/authentication/hooks';

export const updateEmployee = async (employee: Employee) => {
  const { id, ...rest } = employee;
  await cropcoAPI.patch(`${pathsCropco.employees}/update/one/${id}`, rest);
};

export const usePatchEmployee = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(`Empleado actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      handleError({
        error: updateError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para actualizar el empleado',
      });
    },
    retry: 1,
  });
  return mutation;
};
