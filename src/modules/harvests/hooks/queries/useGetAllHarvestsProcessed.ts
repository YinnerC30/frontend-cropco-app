import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { ResponseApiGetAllRecords } from '@/modules/core/interfaces';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/TypeGetAllRecordsReturn';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responsess/UseGetOneRecordReturn';
import { HarvestProcessed } from '@/modules/harvests/interfaces/HarvestProcessed';
import { useEffect } from 'react';

export const getHarvestsProcessed =
  async (): TypeGetAllRecordsReturn<HarvestProcessed> => {
    return await cropcoAPI.get(`${pathsCropco.harvestsProcessed}/all`);
  };

export const useGetAllHarvestsProcessed = (): UseGetOneRecordReturn<
  ResponseApiGetAllRecords<HarvestProcessed>
> => {
  const { handleError } = useAuthContext();

  const query: UseGetOneRecordReturn<
    ResponseApiGetAllRecords<HarvestProcessed>
  > = useQuery({
    queryKey: ['harvests_processed'],
    queryFn: () => getHarvestsProcessed(),
    select: ({ data }) => {
      return data;
    },
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
