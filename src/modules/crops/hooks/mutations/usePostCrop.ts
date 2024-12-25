import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { Crop } from '@/modules/crops/interfaces/Crop';
import { useNavigate } from 'react-router-dom';
import { MODULE_CROPS_PATHS } from '../../routes/pathRoutes';

export const createCrop = async (crop: Crop): Promise<void> => {
  await cropcoAPI.post(`${pathsCropco.crops}/create`, crop);
};

export const usePostCrop = (): UseMutationReturn<void, Crop> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
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
        messagesStatusError: {},
      });
    },
    retry: 1,
  });

  return mutation;
};
