import {
  createSupplier,
  deleteSupplier,
  updateSupplier,
} from '@/features/suppliers/SupplierMethods';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useSupplierActions = () => {
  const queryClient = useQueryClient();

  const createSupplierMutation = useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success(`Proveedor creado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación del empleado, ${data.message}`,
      );
    },
    retry: 1,
  });

  const updateSupplierMutation = useMutation({
    mutationFn: updateSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success(`Proveedor actualizado`);
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

  const deleteSupplierMutation = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success(`Proveedor eliminado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación del empleado, ${data.message}`,
      );
    },
    retry: 1,
  });

  return {
    createSupplierMutation,
    deleteSupplierMutation,
    updateSupplierMutation,
  };
};
