import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { createSupplier } from '../services/create';

export const usePostSupplier = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success(`Proveedor creado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación del proveedor, ${data.message}`,
      );
    },
    retry: 1,
  });

  return mutation;
};
