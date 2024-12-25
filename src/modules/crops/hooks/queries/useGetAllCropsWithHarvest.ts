import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { AxiosError } from 'axios';
import {
  BasicQueryData,
  ResponseApiGetAllRecords,
  UseGetAllRecordsProps,
} from '@/modules/core/interfaces';
import { toast } from 'sonner';
import { CACHE_CONFIG_TIME } from '@/config';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { Crop } from '../../interfaces/Crop';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';

export const getCropsWithHarvest = async (
  values: BasicQueryData
): TypeGetAllRecordsReturn<Crop> => {
  const { query = '', limit, offset, allRecords = false } = values;
  const params = new URLSearchParams({
    query,
    limit: limit.toString(),
    offset: offset.toString(),
    allRecords: allRecords.toString(),
  });
  const { data } = await cropcoAPI.get(
    `${pathsCropco.crops}/with-harvest/all?${params}`
  );
  return data;
};

export const useGetAllCropsWithHarvest = ({
  queryValue,
  allRecords,
}: UseGetAllRecordsProps): UseGetAllRecordsReturn<Crop> => {
  const { pagination, setPagination } = usePaginationDataTable();

  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized =
    hasPermission('crops', 'find_all_crops_with_harvest') &&
    hasPermission('harvests', 'find_all_harvests');

  const query: UseQueryResult<
    ResponseApiGetAllRecords<Crop>,
    AxiosError
  > = useQuery({
    queryKey: ['crops-with-harvest', { queryValue, ...pagination }],
    queryFn: () =>
      getCropsWithHarvest({
        query: queryValue,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
    enabled: isAuthorized,
    staleTime: CACHE_CONFIG_TIME.mediumTerm.staleTime,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error('No tienes permiso para ver el cultivos con cosechas 😑');
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messagesStatusError: {},
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};
