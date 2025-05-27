import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { toast } from 'sonner';
import { SaleTotalInYearData } from '../../interfaces/charts/SalesTotalInYear';
import { CACHE_CONFIG_TIME } from '@/config';
// import { SaleTotalInYearData } from '../../interfaces/charts/SalesTotalInYear';
// import { HarvestTotalInYearData } from '../../interfaces/charts/SalesTotalInYear';

interface QueryParams {
  year: number;
  crop: string;
  client: string;
}

export const getTotalSalesInYear = async ({
  year,
  crop,
  client,
}: QueryParams): PromiseReturnRecord<SaleTotalInYearData> => {
  const params = new URLSearchParams({
    year: year.toString(),
  });

  if (crop.length > 0) {
    params.append('cropId', crop);
  }
  if (client.length > 0) {
    params.append('clientId', client);
  }

  return await cropcoAPI.get(
    `${pathsCropco.dashboard}/find/total-sales-in-year?${params}`
  );
};

export const useGetTotalSalesInYear = ({
  year = new Date().getFullYear(),
  crop = '',
  client = '',
}: QueryParams): UseGetOneRecordReturn<SaleTotalInYearData> => {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission(
    'dashboard',
    'find_total_sales_in_year_chart'
  );

  const query: UseGetOneRecordReturn<SaleTotalInYearData> = useQuery({
    queryKey: ['sales-value_pay-year', year, crop, client],
    queryFn: () => getTotalSalesInYear({ year, crop, client }),
    select: ({ data }) => data,
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.longTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'No tienes permiso para ver el listado del value_pay de ventas en el año 😑'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {
          unauthorized:
            'No tienes permiso para ver el listado del value_pay de ventas en el año 😑',
        },
      });
    }
  }, [query.isError, query.error]);

  return query;
};
