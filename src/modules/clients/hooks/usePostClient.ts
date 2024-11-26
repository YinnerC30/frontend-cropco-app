import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Client } from '@/modules/clients/interfaces/Client';

export const createClient = async (client: Client) =>
  await cropcoAPI.post(`${pathsCropco.clients}/create`, client);

export const usePostClient = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success(`Cliente creado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación del cliente, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
