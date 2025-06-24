import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { toast } from 'sonner';
import { ConsumptionTotalInYearData } from '../../interfaces/charts/ConsumptionsTotalInYear';
import { CACHE_CONFIG_TIME } from '@/config';

interface QueryParams {
  year: number;
  crop: string;
  supply: string;
}

export const getTotalConsumptionsInYear = async ({
  year,
  crop,
  supply,
}: QueryParams): PromiseReturnRecord<ConsumptionTotalInYearData> => {
  const params = new URLSearchParams({
    year: year.toString(),
  });

  if (crop.length > 0) {
    params.append('cropId', crop);
  }
  if (supply.length > 0) {
    params.append('supplyId', supply);
  }

  return await cropcoAPI.get(
    `${pathsCropco.dashboard}/find/total-consumptions-in-year?${params}`
  );
};

export const useGetTotalConsumptionsInYear = ({
  year = new Date().getFullYear(),
  crop = '',
  supply = '',
}: QueryParams): UseGetOneRecordReturn<ConsumptionTotalInYearData> => {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission(
    'dashboard',
    'find_total_consumptions_in_year_chart'
  );

  const query: UseGetOneRecordReturn<ConsumptionTotalInYearData> = useQuery({
    queryKey: ['consumptions-total-year', year, crop, supply],
    queryFn: () => getTotalConsumptionsInYear({ year, crop, supply }),
    select: ({ data }) => data,
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.longTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'No tienes permiso para ver el listado del total de consumos en el año 😑'
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
