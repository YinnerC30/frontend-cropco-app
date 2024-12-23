import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { Employee } from '../../interfaces/Employee';

export const updateEmployee = async (
  employee: Partial<Employee>
): Promise<void> => {
  const { id, ...rest } = employee;
  await cropcoAPI.patch(`${pathsCropco.employees}/update/one/${id}`, rest);
};

export const usePatchEmployee = (): UseMutationResult<
  void,
  AxiosError,
  Partial<Employee>,
  unknown
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationResult<
    void,
    AxiosError,
    Partial<Employee>,
    unknown
  > = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(`Empleado actualizado`);
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
