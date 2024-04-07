import {
  createCrop,
  deleteCrop,
  updateCrop,
} from '@/dashboard/crops/CropMethods';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useCropActions = () => {
  const queryClient = useQueryClient();

  const createCropMutation = useMutation({
    mutationFn: createCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      toast.success(`Cultivo creado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación del cultivo, ${data.message}`,
      );
    },
  });

  const updateCropMutation = useMutation({
    mutationFn: updateCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      toast.success(`Cultivo actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del cultivo, ${data.message}`,
      );
    },
  });

  const deleteCropMutation = useMutation({
    mutationFn: deleteCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      toast.success(`Cultivo eliminado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación del cultivo, ${data.message}`,
      );
    },
  });

  return {
    createCropMutation,
    updateCropMutation,
    deleteCropMutation,
  };
};
