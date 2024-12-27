import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { HarvestStock } from '@/modules/harvests/interfaces/HarvestStock';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { ResponseApiGetAllRecords } from '@/modules/core/interfaces';
import { useAuthContext } from '@/auth';
import { useEffect } from 'react';

export const getHarvestStock =
  async (): TypeGetAllRecordsReturn<HarvestStock> => {
    return await cropcoAPI.get(`${pathsCropco.harvestsStock}/all?`);
  };

export const useGetAllHarvestsStock = (): UseGetOneRecordReturn<
  ResponseApiGetAllRecords<HarvestStock>
> => {
  const { handleError } = useAuthContext();
  const query: UseGetOneRecordReturn<ResponseApiGetAllRecords<HarvestStock>> =
    useQuery({
      queryKey: ['harvests_stock'],
      queryFn: () => getHarvestStock(),
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
