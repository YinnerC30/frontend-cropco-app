import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responsess/UseGetOneRecordReturn';
import { Employee } from '@/modules/employees/interfaces/Employee';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const getEmployeeWithPaymentsPending = async (
  id: string
): PromiseReturnRecord<Employee> => {
  return await cropcoAPI.get(
    `${pathsCropco.employees}/pending-payments/one/${id}`
  );
};

export const useGetEmployeePendingPayments = (
  id = '',
  canExecuteQuery = true
): UseGetOneRecordReturn<Employee> => {
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission(
    'employees',
    'find_one_employee_with_pending_payments'
  );

  const query: UseGetOneRecordReturn<Employee> = useQuery({
    queryKey: ['employee', 'pending-payments', id],
    queryFn: () => getEmployeeWithPaymentsPending(id),
    select: ({data}) => data,
    enabled: id.length > 0 && canExecuteQuery,
    staleTime: 60_000 * 3,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso de lectura para obtener la información del empleado solicitado'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {},
      });
    }
  }, [query.isError, query.error]);

  return query;
};
