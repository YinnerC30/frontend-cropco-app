import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import {
  BasicQueryData,
  UseGetAllRecordsProps,
} from '@/modules/core/interfaces';

import { useAuthContext } from '@/auth/hooks';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { Supply } from '../../interfaces/Supply';

export const getSupplies = async ({
  query = '',
  limit = 10,
  offset = 0,
  allRecords = false,
}: BasicQueryData): TypeGetAllRecordsReturn<Supply> => {
  const params = new URLSearchParams({
    query,
    limit: limit.toString(),
    offset: offset.toString(),
    allRecords: allRecords.toString(),
  });

  return await cropcoAPI.get(`${pathsCropco.supplies}/all?${params}`);
};

// TODO: Cambiar stale time
const STALE_TIME_DATA = 60_000 * 60;
export const useGetAllSupplies = ({
  queryValue,
  allRecords,
}: UseGetAllRecordsProps): UseGetAllRecordsReturn<Supply> => {
  const { pagination, setPagination } = usePaginationDataTable();
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('supplies', 'find_all_supplies');

  const query: UseQueryGetAllRecordsReturn<Supply> = useQuery({
    queryKey: ['supplies', { queryValue, ...pagination }],
    queryFn: () =>
      getSupplies({
        query: queryValue,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
      select: ({ data }) => data,
    enabled: isAuthorized,
    staleTime: STALE_TIME_DATA,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error('No tienes permiso para ver el listado de suministros 😑');
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {},
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};
