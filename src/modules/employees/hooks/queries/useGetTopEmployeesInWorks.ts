import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';

interface EmployeeTopWork {
  id: string;
  first_name: string;
  last_name: string;
  total_works: number;
  value_pay_works: number;
}

export const getTopEmployeesInWorks = async ({
  year,
}: {
  year: number;
}): TypeGetAllRecordsReturn<EmployeeTopWork> => {
  const params = new URLSearchParams({
    year: year.toString(),
  });
  return await cropcoAPI.get(
    `${pathsCropco.dashboard}/find/top-employees-in-works?${params}`
  );
};

export const useGetTopEmployeesInWorks = ({
  year = new Date().getFullYear(),
}: {
  year?: number;
}): UseQueryGetAllRecordsReturn<EmployeeTopWork> => {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission(
    'dashboard',
    'find_top_employees_in_works_chart'
  );

  const query: UseQueryGetAllRecordsReturn<EmployeeTopWork> = useQuery({
    queryKey: ['employees-top-works', year],
    queryFn: () => getTopEmployeesInWorks({ year }),
    select: ({ data }) => data,
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'No tienes permiso para ver el listado del top usuarios en trabajos 😑'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {
          unauthorized:
            'No tienes permiso para ver el listado del top usuarios en trabajos 😑',
        },
      });
    }
  }, [query.isError, query.error]);

  return query;
};
