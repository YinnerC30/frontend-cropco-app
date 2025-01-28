import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { HarvestProcessed } from '@/modules/harvests/interfaces/HarvestProcessed';
import { useEffect } from 'react';

export const getHarvestProcessedById = async (
  id: string
): PromiseReturnRecord<HarvestProcessed> => {
  return await cropcoAPI.get(`${pathsCropco.harvestsProcessed}/one/${id}`);
};

export const useGetHarvestProcessed = (
  id: string
): UseGetOneRecordReturn<HarvestProcessed> => {
  const { handleError } = useAuthContext();
  const query: UseGetOneRecordReturn<HarvestProcessed> = useQuery({
    queryKey: ['harvest-processed', id],
    queryFn: () => getHarvestProcessedById(id),
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
