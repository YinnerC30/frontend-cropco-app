import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { usePaginationDataTable } from '@/modules/core/hooks';
import {
  BasicQueryData,
  ResponseApiGetAllRecords,
  UseGetAllRecordsProps,
} from '@/modules/core/interfaces';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Crop } from '../../interfaces/Crop';

export const getCropsWithWork = async (
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
    `${pathsCropco.crops}/with-work/all?${params}`
  );
  return data;
};

export const useGetAllCropsWithWork = ({
  queryValue,
  allRecords,
}: UseGetAllRecordsProps): UseGetAllRecordsReturn<Crop> => {
  const { pagination, setPagination } = usePaginationDataTable();
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission('crops', 'find_all_crops_with_work');
  const query: UseQueryResult<
    ResponseApiGetAllRecords<Crop>,
    AxiosError
  > = useQuery({
    queryKey: ['crops-with-work', { queryValue, ...pagination }],
    queryFn: () =>
      getCropsWithWork({
        query: queryValue,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'No tienes permiso para ver el listado de cultivos con trabajos 😑'
      );
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
