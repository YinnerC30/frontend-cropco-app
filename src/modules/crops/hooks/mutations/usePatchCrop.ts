import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Crop } from '@/modules/crops/interfaces/Crop';
import { useManageErrorApp } from '@/modules/authentication/hooks';

import { useNavigate } from 'react-router-dom';
import { MODULE_CROPS_PATHS } from '../../routes/pathRoutes';

export const updateCrop = async (crop: Crop) => {
  const { id, ...rest } = crop;
  return await cropcoAPI.patch(`${pathsCropco.crops}/update/one/${id}`, rest);
};

export const usePatchCrop = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: updateCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      navigate(MODULE_CROPS_PATHS.ViewAll);
      toast.success(`Cultivo actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      handleError({
        error: updateError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para actualizar el cultivo',
      });
    },
    retry: 1,
  });
  return mutation;
};
