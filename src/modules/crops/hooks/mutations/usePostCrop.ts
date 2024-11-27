import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Crop } from '@/modules/crops/interfaces/Crop';
import { useManageErrorApp } from '@/modules/authentication/hooks';
import { useNavigate } from 'react-router-dom';
import { MODULE_CROPS_PATHS } from '../routes/pathRoutes';

export const createCrop = async (crop: Crop) => {
  return await cropcoAPI.post(`${pathsCropco.crops}/create`, crop);
};

export const usePostCrop = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
      navigate(MODULE_CROPS_PATHS.ViewAll);
      toast.success(`Cultivo creado`);
    },
    onError: (error: AxiosError) => {
      const createError: AxiosError | any = error;
      handleError({
        error: createError as AxiosError,
        messageUnauthoraizedError: 'No tienes permiso para crear un cultivo',
      });
    },
    retry: 1,
  });

  return mutation;
};
