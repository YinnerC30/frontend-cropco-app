import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { Client } from '@/modules/clients/interfaces/Client';
import { useNavigate } from 'react-router-dom';
import { MODULE_CLIENTS_PATHS } from '../../routes/pathRoutes';

export const updateClient = async (client: Client): Promise<void> => {
  const { id, ...rest } = client;
  await cropcoAPI.patch(`${pathsCropco.clients}/update/one/${id}`, rest);
};

export const usePatchClient = (): UseMutationResult<
  void,
  AxiosError,
  Client,
  unknown
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      navigate(MODULE_CLIENTS_PATHS.ViewAll);
      toast.success(`Cliente actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      handleError({
        error: updateError as AxiosError,
        messagesStatusError: {},
      });
    },
    retry: 1,
  });
  return mutation;
};
