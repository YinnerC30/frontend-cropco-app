import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { HarvestStock } from '@/modules/harvests/interfaces/HarvestStock';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { ResponseApiGetAllRecords } from '@/modules/core/interfaces';
import { useAuthContext } from '@/auth';
import { useEffect } from 'react';

export const getCropsWithStock =
  async (): TypeGetAllRecordsReturn<HarvestStock> => {
    return await cropcoAPI.get(`${pathsCropco.crops}/stock/all?`);
  };

export const useGetAllCropsWithStock = (): UseGetOneRecordReturn<
  ResponseApiGetAllRecords<HarvestStock>
> => {
  const { handleError } = useAuthContext();
  const query: UseGetOneRecordReturn<ResponseApiGetAllRecords<HarvestStock>> =
    useQuery({
      queryKey: ['crops-with-stock'],
      queryFn: () => getCropsWithStock(),
      select: ({ data }) => data,
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
