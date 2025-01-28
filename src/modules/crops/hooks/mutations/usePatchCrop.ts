import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { Crop } from '@/modules/crops/interfaces/Crop';

import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useNavigate } from 'react-router-dom';
import { MODULE_CROPS_PATHS } from '../../routes/pathRoutes';

export const updateCrop = async (crop: Crop): PromiseReturnRecord<void> => {
  const { id, ...rest } = crop;
  return await cropcoAPI.patch(`${pathsCropco.crops}/update/one/${id}`, rest);
};

export const usePatchCrop = (): UseMutationReturn<void, Crop> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, Crop> = useMutation({
    mutationFn: updateCrop,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['crops'] });
      await queryClient.invalidateQueries({ queryKey: ['crop'] });
      navigate(MODULE_CROPS_PATHS.ViewAll);
      toast.success(`Cultivo actualizado`);
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
