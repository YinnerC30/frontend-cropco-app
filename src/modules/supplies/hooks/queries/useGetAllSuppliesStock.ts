import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface HookProps {
  searchParameter: string;
  allRecords: boolean;
}

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

export const getAllSuppliesStock = async ({
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

  return await cropcoAPI.get(`${pathsCropco.supplies}/stock/all?${params}`);
};

export const useGetAllSuppliesStock = ({
  queryValue,
  allRecords,
}: UseGetAllRecordsProps): UseGetAllRecordsReturn<Supply> => {
  const { pagination, setPagination } = usePaginationDataTable();

  const { handleError, hasPermission } = useAuthContext();

  const isAuthorized = hasPermission('supplies', 'find_all_supplies_stock');

  const query: UseQueryGetAllRecordsReturn<Supply> = useQuery({
    queryKey: ['supplies-stock', { queryValue, ...pagination }],
    queryFn: () =>
      getAllSuppliesStock({
        query: queryValue,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
    select: ({ data }) => data,
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'No tienes permiso para ver el listado de suministros con stock 😑'
      );
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
