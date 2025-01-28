import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Work } from '../../interfaces/Work';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useNavigate } from 'react-router-dom';
import { MODULE_WORKS_PATHS } from '../../routes/pathRoutes';
import { useFormChange } from '@/modules/core/components';

export async function createWork(work: Work): PromiseReturnRecord<Work> {
  return await cropcoAPI.post(`${pathsCropco.works}/create`, work);
}

export function usePostWork(): UseMutationReturn<Work, Work> {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const { markChanges } = useFormChange();
  const mutation: UseMutationReturn<Work, Work> = useMutation({
    mutationFn: createWork,
    onSuccess: async () => {
      markChanges(false);
      await queryClient.invalidateQueries({ queryKey: ['works'] });
      navigate(MODULE_WORKS_PATHS.ViewAll);
      toast.success(`Trabajo creado`);
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
