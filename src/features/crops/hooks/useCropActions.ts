import { createCrop, updateCrop, deleteCrop } from '@/services/cropcoAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useCropActions = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const createCropMutation = useMutation({
    mutationFn: createCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      toast('Cultivo fue creado exitosamente');
      navigate('../view');
    },
    onError: (error: AxiosError | any) => {
      const { data } = error.response;
      toast(`Hubo un problema creando el cultivo, ${data.message}`);
    },
  });

  const updateCropMutation = useMutation({
    mutationFn: updateCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      toast('Cultivo actualizado con éxito');
      navigate(-1);
    },
    onError: (error: AxiosError | any) => {
      const { data } = error.response;
      toast(`Hubo un problema actualizando el cultivo, ${data.message}`);
    },
  });

  const deleteCropMutation = useMutation({
    mutationFn: deleteCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      toast('Registro eliminado');
    },
  });

  return {
    createCropMutation,
    updateCropMutation,
    deleteCropMutation,
  };
};
