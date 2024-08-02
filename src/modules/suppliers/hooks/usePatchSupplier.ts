import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { updateSupplier } from '../services/updateSupplier';

export const usePatchSupplier = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success(`Proveedor actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del proveedor, ${data.message}`,
      );
    },
    retry: 1,
  });
  return mutation;
};
