import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { Employee } from '@/modules/employees/interfaces/Employee';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const getEmployeesWithHarvests =
  async (): TypeGetAllRecordsReturn<Employee> => {
    return await cropcoAPI.get(`${pathsCropco.employees}/harvests/all`);
  };

export const useGetAllEmployeesWithHarvests =
  (): UseQueryGetAllRecordsReturn<Employee> => {
    const { handleError, hasPermission } = useAuthContext();

    const isAuthorized = hasPermission(
      'employees',
      'find_all_employees_with_harvests'
    );
    const query: UseQueryGetAllRecordsReturn<Employee> = useQuery({
      queryKey: ['employees', 'harvests'],
      queryFn: () => getEmployeesWithHarvests(),
      staleTime: 60_000 * 60,
      select: ({ data }) => data,
      enabled: isAuthorized,
    });

    useEffect(() => {
      if (!isAuthorized) {
        toast.error(
          'Requieres del permiso de lectura para obtener los empleados con cosechas'
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
