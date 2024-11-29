import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Supply } from '@/modules/supplies/interfaces/Supply';
import { useManageErrorApp } from '@/auth/hooks';
import { useNavigate } from 'react-router-dom';
import { MODULE_SUPPLIES_PATHS } from '../../routes/pathRoutes';

export const updateSupply = async (supply: Supply): Promise<void> => {
  const { id, ...rest } = supply;
  await cropcoAPI.patch(`${pathsCropco.supplies}/update/one/${id}`, rest);
};

export const usePatchSupply = (): UseMutationResult<
  void,
  AxiosError<unknown, any>,
  Supply,
  unknown
> => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: updateSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      navigate(MODULE_SUPPLIES_PATHS.ViewAll);
      toast.success(`Insumo actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      handleError({
        error: updateError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para actualizar un suministro',
      });
    },
    retry: 1,
  });
  return mutation;
};
