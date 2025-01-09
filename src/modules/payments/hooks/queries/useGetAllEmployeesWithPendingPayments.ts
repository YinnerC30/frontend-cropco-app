import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { Employee } from '@/modules/employees/interfaces/Employee';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';


export const getEmployeesWithPaymentsPending =
  async (): TypeGetAllRecordsReturn<Employee> => {
    return await cropcoAPI.get(`${pathsCropco.employees}/pending-payments/all`);
  };

export const useGetAllEmployeesWithPendingPayments =
  (): UseQueryGetAllRecordsReturn<Employee> => {
    const { handleError, hasPermission } = useAuthContext();
    const isAuthorized = hasPermission(
      'employees',
      'find_one_employee_with_pending_payments'
    );

    const query: UseQueryGetAllRecordsReturn<Employee> = useQuery({
      queryKey: ['employees', 'pending-payments'],
      queryFn: () => getEmployeesWithPaymentsPending(),
      staleTime: 60_000 * 60,
      select: ({ data }) => data,
      enabled: isAuthorized,
    });

    useEffect(() => {
      if (!isAuthorized) {
        toast.error(
          'Requieres del permiso de lectura para obtener la información del usuario solicitado'
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
