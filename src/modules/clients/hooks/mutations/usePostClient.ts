import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { Client } from '@/modules/clients/interfaces/Client';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useNavigate } from 'react-router-dom';
import { MODULE_CLIENTS_PATHS } from '../../routes/pathRoutes';

export const createClient = async (
  client: Client
): PromiseReturnRecord<Client> => {
  return await cropcoAPI.post(`${pathsCropco.clients}/create`, client);
};

export const usePostClient = (): UseMutationReturn<Client, Client> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();

  const navigate = useNavigate();
  const mutation: UseMutationReturn<Client, Client> = useMutation({
    mutationFn: createClient,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['clients'] });
      navigate(MODULE_CLIENTS_PATHS.ViewAll);
      toast.success(`Cliente creado`);
    },
    onError: (error) => {
      handleError({
        error,
        handlers: {},
      });
    },
    retry: false,
  });

  return mutation;
};
