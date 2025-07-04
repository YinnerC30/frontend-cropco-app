import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import {
  BasicQueryData,
  UseGetAllRecordsProps,
} from '@/modules/core/interfaces';

import { useAuthContext } from '@/auth/hooks';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { Supply } from '../../interfaces/Supply';
import { CACHE_CONFIG_TIME } from '@/config';

export const getSupplies = async ({
  query = '',
  limit = 10,
  offset = 0,
  all_records = false,
}: BasicQueryData): TypeGetAllRecordsReturn<Supply> => {
  const params = new URLSearchParams({
    query,
    limit: limit.toString(),
    offset: offset.toString(),
    all_records: all_records.toString(),
  });

  return await cropcoAPI.get(`${pathsCropco.supplies}/all?${params}`);
};

export const useGetAllSupplies = ({
  queryValue,
  all_records,
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
        all_records,
      }),
    select: ({ data }) => data,
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.mediumTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error('No tienes permiso para ver el listado de insumos ');
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

  return { query, pagination, setPagination };
};
