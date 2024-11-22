import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Employee } from '../interfaces/Employee';

export const createEmployee = async (employee: Employee) =>
  await cropcoAPI.post(`${pathsCropco.employees}/create`, employee);

export const usePostEmployee = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(`Empleado creado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación del empleado, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
