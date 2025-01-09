import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { Employee } from '@/modules/employees/interfaces/Employee';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';


export const getEmployeesWithPaymentsMade =
  async (): TypeGetAllRecordsReturn<Employee> => {
    return await cropcoAPI.get(`${pathsCropco.employees}/made-payments/all`);
  };

export const useGetAllEmployeesWithMadePayments =
  (): UseQueryGetAllRecordsReturn<Employee> => {
    const { handleError, hasPermission } = useAuthContext();
    const isAuthorized = hasPermission(
      'employees',
      'find_all_employees_with_made_payments'
    );
    const query: UseQueryGetAllRecordsReturn<Employee> = useQuery({
      queryKey: ['employees', 'made-payments'],
      queryFn: () => getEmployeesWithPaymentsMade(),
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
