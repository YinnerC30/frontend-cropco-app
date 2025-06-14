import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../../interfaces/Employee';
import { MODULE_EMPLOYEE_PATHS } from '../../routes/pathRoutes';

export const createEmployee = async (
  employee: Employee
): PromiseReturnRecord<Employee> => {
  return await cropcoAPI.post(`${pathsCropco.employees}/create`, employee);
};

export const usePostEmployee = (): UseMutationReturn<Employee, Employee> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<Employee, Employee> = useMutation({
    mutationFn: createEmployee,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['employees'] });
      await queryClient.invalidateQueries({
        queryKey: ['employees-top-harvests'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['employees-top-works'],
      });
      navigate(MODULE_EMPLOYEE_PATHS.ViewAll);
      toast.success(`Empleado creado`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {},
      });
    },
    retry: false,
  });

  return mutation;
};
