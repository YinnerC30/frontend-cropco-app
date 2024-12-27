import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { Work } from '../../interfaces/Work';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export async function updateWork({ id, ...rest }: Work): Promise<void> {
  await cropcoAPI.patch(`${pathsCropco.works}/update/one/${id}`, rest);
}

export function usePatchWork(
  id: string
): UseMutationResult<void, AxiosError<unknown, any>, Work, unknown> {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateWork,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['works'] });
      await queryClient.invalidateQueries({ queryKey: ['works', id] });
      toast.success(`Trabajo actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del trabajo, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
}
