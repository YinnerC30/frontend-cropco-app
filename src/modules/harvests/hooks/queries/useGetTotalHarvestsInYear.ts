import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { toast } from 'sonner';
import { HarvestTotalInYearData } from '../../interfaces/charts/HarvestsTotalInYear';
import { CACHE_CONFIG_TIME } from '@/config';

interface QueryParams {
  year: number;
  crop: string;
  employee: string;
}

export const getTotalHarvestsInYear = async ({
  year,
  crop,
  employee,
}: QueryParams): PromiseReturnRecord<HarvestTotalInYearData> => {
  const params = new URLSearchParams({
    year: year.toString(),
  });

  if (crop.length > 0) {
    params.append('crop', crop);
  }
  if (employee.length > 0) {
    params.append('employee', employee);
  }

  return await cropcoAPI.get(
    `${pathsCropco.dashboard}/find/total-harvest-in-year?${params}`
  );
};

export const useGetTotalHarvestsInYear = ({
  year = new Date().getFullYear(),
  crop = '',
  employee = '',
}: QueryParams): UseGetOneRecordReturn<HarvestTotalInYearData> => {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission(
    'dashboard',
    'find_total_harvest_in_year_chart'
  );

  const query: UseGetOneRecordReturn<HarvestTotalInYearData> = useQuery({
    queryKey: ['harvests-amount-year', year, crop, employee],
    queryFn: () => getTotalHarvestsInYear({ year, crop, employee }),
    select: ({ data }) => data,
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.longTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'No tienes permiso para ver el listado del amount de cosechas en el año 😑'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        handlers: {},
      });
    }
  }, [query.isError, query.error]);

  return query;
};
