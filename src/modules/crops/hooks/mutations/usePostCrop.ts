import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { Crop } from '@/modules/crops/interfaces/Crop';
import { useNavigate } from 'react-router-dom';
import { MODULE_CROPS_PATHS } from '../../routes/pathRoutes';

export const createCrop = async (crop: Crop): PromiseReturnRecord<void> => {
  return await cropcoAPI.post(`${pathsCropco.crops}/create`, crop);
};

export const usePostCrop = (): UseMutationReturn<void, Crop> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, Crop> = useMutation({
    mutationFn: createCrop,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['crops'] });
      navigate(MODULE_CROPS_PATHS.ViewAll);
      toast.success(`Cultivo creado`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {},
      });
    },
    retry: 1,
  });

  return mutation;
};
