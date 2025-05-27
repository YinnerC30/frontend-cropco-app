import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { CACHE_CONFIG_TIME } from '@/config';

interface EmployeeTopHarvest {
  id: string;
  first_name: string;
  last_name: string;
  total_harvests: number;
  total_value_pay: number;
}

export const getTopEmployeesInHarvests = async ({
  year,
}: {
  year: number;
}): TypeGetAllRecordsReturn<EmployeeTopHarvest> => {
  const params = new URLSearchParams({
    year: year.toString(),
  });
  return await cropcoAPI.get(
    `${pathsCropco.dashboard}/find/top-employees-in-harvests?${params}`
  );
};

export const useGetTopEmployeesInHarvests = ({
  year = new Date().getFullYear(),
}: {
  year?: number;
}): UseQueryGetAllRecordsReturn<EmployeeTopHarvest> => {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission(
    'dashboard',
    'find_top_employees_in_harvests_chart'
  );

  const query: UseQueryGetAllRecordsReturn<EmployeeTopHarvest> = useQuery({
    queryKey: ['employees-top-harvests', year],
    queryFn: () => getTopEmployeesInHarvests({ year }),
    select: ({ data }) => data,
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.longTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'No tienes permiso para ver el listado del top usuarios en cosechas 😑'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {
          unauthorized:
            'No tienes permiso para ver el listado del top usuarios en cosechas 😑',
        },
      });
    }
  }, [query.isError, query.error]);

  return query;
};
