import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const deleteEmployee = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.employees}/remove/one/${id}`);

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(`Empleado eliminado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación del empleado, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
};
