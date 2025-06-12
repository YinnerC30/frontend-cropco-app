import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { CACHE_CONFIG_TIME } from '@/config';

interface EmployeeTopWork {
  id: string;
  first_name: string;
  last_name: string;
  total_works: number;
  total_value_pay: number;
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
    select: ({ data }) => ({
      ...data,
      records: data.records.map((re) => {
        return { ...re, full_name: re.first_name + ' ' + re.last_name };
      }),
    }),
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.longTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'No tienes permiso para ver el listado del top empleados en los trabajos 😑'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {
          unauthorized:
            'No tienes permiso para ver el listado del top empleados en los trabajos 😑',
        },
      });
    }
  }, [query.isError, query.error]);

  return query;
};
