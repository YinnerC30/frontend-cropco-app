import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { updateEmployee } from '../services/updateEmployee';

export const usePatchEmployee = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(`Empleado actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del empleado, ${data.message}`,
      );
    },
    retry: 1,
  });
  return mutation;
};
