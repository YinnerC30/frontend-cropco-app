import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { Harvest } from '@/modules/harvests/interfaces/Harvest';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';

export const updateHarvest = async (
  harvest: Harvest
): PromiseReturnRecord<void> => {
  const { id, ...rest } = harvest;
  return await cropcoAPI.patch(
    `${pathsCropco.harvests}/update/one/${id}`,
    rest
  );
};

export const usePatchHarvest = (): UseMutationReturn<void, Harvest> => {
  const { handleError } = useAuthContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: updateHarvest,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['harvests'] });
      await queryClient.invalidateQueries({
        queryKey: ['harvest', variables.id],
      });
      navigate(MODULE_HARVESTS_PATHS.ViewAll);
      toast.success(`Cosecha actualizada`);
    },
    onError: (error: AxiosError<TypedAxiosError, unknown>) => {
      handleError({
        error,
        messagesStatusError: {},
      });
    },
    retry: 1,
  });
  return mutation;
};
