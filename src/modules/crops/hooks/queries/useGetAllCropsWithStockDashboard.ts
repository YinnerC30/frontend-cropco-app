import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { HarvestStock } from '@/modules/harvests/interfaces/HarvestStock';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { ResponseApiGetAllRecords } from '@/modules/core/interfaces';
import { useAuthContext } from '@/auth';
import { useEffect } from 'react';
import { CACHE_CONFIG_TIME } from '@/config';

export const getCropsWithStockDashboard =
  async (): TypeGetAllRecordsReturn<HarvestStock> => {
    return await cropcoAPI.get(`${pathsCropco.dashboard}/stock/all?`);
  };

export const useGetAllCropsWithStockDashboard = (): UseGetOneRecordReturn<
  ResponseApiGetAllRecords<HarvestStock>
> => {
  const { handleError } = useAuthContext();
  const query: UseGetOneRecordReturn<ResponseApiGetAllRecords<HarvestStock>> =
    useQuery({
      queryKey: ['crops-with-stock-dashboard'],
      queryFn: () => getCropsWithStockDashboard(),
      select: ({ data }) => data,
      refetchOnWindowFocus: false,
      ...CACHE_CONFIG_TIME.longTerm,
    });

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
