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

export const createClient = async (client: Client): Promise<Client> =>
  await cropcoAPI.post(`${pathsCropco.clients}/create`, client);

export const usePostClient = (): UseMutationResult<
  Client,
  AxiosError,
  Client,
  unknown
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      navigate(MODULE_CLIENTS_PATHS.ViewAll);
      toast.success(`Cliente creado`);
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
