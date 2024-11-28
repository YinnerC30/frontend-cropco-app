import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Supply } from '@/modules/supplies/interfaces/Supply';
import { useManageErrorApp } from '@/modules/authentication/hooks';
import { useNavigate } from 'react-router-dom';
import { MODULE_SUPPLIES_PATHS } from '../../routes/pathRoutes';

export const createSupply = async (supply: Supply): Promise<Supply> =>
  await cropcoAPI.post(`${pathsCropco.supplies}/create`, supply);

export const usePostSupply = (): UseMutationResult<
  Supply,
  AxiosError<unknown, any>,
  Supply,
  unknown
> => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      navigate(MODULE_SUPPLIES_PATHS.ViewAll);
      toast.success(`Insumo creado`);
    },
    onError: (error: AxiosError) => {
      const createError: AxiosError | any = error;
      handleError({
        error: createError as AxiosError,
        messageUnauthoraizedError: 'No tienes permiso para crear un suministro',
      });
    },
    retry: 1,
  });

  return mutation;
};
