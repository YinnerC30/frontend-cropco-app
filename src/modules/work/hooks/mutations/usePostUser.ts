import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Work } from '../../interfaces/Work';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export async function createWork(work: Work): Promise<Work> {
  return await cropcoAPI.post(`${pathsCropco.works}/create`, work);
}

export function usePostWork(): UseMutationResult<
  Work,
  AxiosError<unknown, any>,
  Work,
  unknown
> {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createWork,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['works'] });
      toast.success(`Trabajo creado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación del trabajo, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
}
