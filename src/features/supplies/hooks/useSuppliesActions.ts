import {
  createSupply,
  deleteSupply,
  updateSupply,
} from '@/services/cropco/SupplyMethods';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useSupplyActions = () => {
  const queryClient = useQueryClient();

  const createSupplyMutation = useMutation({
    mutationFn: createSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      toast.success(`Insumo creado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación del insumo, ${data.message}`,
      );
    },
    retry: 1,
  });

  const updateSupplyMutation = useMutation({
    mutationFn: updateSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      toast.success(`Insumo actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del insumo, ${data.message}`,
      );
    },
    retry: 1,
  });

  const deleteSupplyMutation = useMutation({
    mutationFn: deleteSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      toast.success(`Insumo eliminado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación del insumo, ${data.message}`,
      );
    },
    retry: 1,
  });

  return {
    createSupplyMutation,
    deleteSupplyMutation,
    updateSupplyMutation,
  };
};
