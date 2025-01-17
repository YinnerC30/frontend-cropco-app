import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responsess/UseMutationReturn';
import { Employee } from '../../interfaces/Employee';

export const updateEmployee = async (
  employee: Partial<Employee>
): PromiseReturnRecord<void> => {
  const { id, ...rest } = employee;
  return await cropcoAPI.patch(
    `${pathsCropco.employees}/update/one/${id}`,
    rest
  );
};

export const usePatchEmployee = (): UseMutationReturn<
  void,
  Partial<Employee>
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, Partial<Employee>> = useMutation({
    mutationFn: updateEmployee,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(`Empleado actualizado`);
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
};
