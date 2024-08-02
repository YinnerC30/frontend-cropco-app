import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { deleteSupplier } from '../services/deleteSupplier';

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success(`Proveedor eliminado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación del proveedor, ${data.message}`,
      );
    },
    retry: 1,
  });
  return mutation;
};
