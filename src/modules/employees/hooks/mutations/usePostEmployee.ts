import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

import { useAuthContext } from '@/auth/hooks';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../../interfaces/Employee';
import { MODULE_EMPLOYEE_PATHS } from '../../routes/pathRoutes';

export const createEmployee = async (employee: Employee): Promise<Employee> => {
  const { data } = await cropcoAPI.post(
    `${pathsCropco.employees}/create`,
    employee
  );
  return data;
};

export const usePostEmployee = (): UseMutationResult<
  Employee,
  AxiosError,
  Employee,
  unknown
> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      navigate(MODULE_EMPLOYEE_PATHS.ViewAll);
      toast.success(`Empleado creado`);
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
