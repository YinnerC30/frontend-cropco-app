import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Work } from '../../interfaces/Work';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useNavigate } from 'react-router-dom';
import { MODULE_WORKS_PATHS } from '../../routes/pathRoutes';

export async function updateWork({
  id,
  ...rest
}: Work): PromiseReturnRecord<void> {
  {
    return await cropcoAPI.patch(`${pathsCropco.works}/update/one/${id}`, rest);
  }
}

export function usePatchWork(id: string): UseMutationReturn<void, Work> {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, Work> = useMutation({
    mutationFn: updateWork,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['works'] });
      await queryClient.invalidateQueries({ queryKey: ['works', id] });
      navigate(MODULE_WORKS_PATHS.ViewAll);
      toast.success(`Trabajo actualizado`);
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
}
