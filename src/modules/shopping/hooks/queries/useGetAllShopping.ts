import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { CACHE_CONFIG_TIME } from '@/config';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { QueryDateProps } from '@/modules/core/interfaces/queries/QueryDateProps';
import { QueryPaginationProps } from '@/modules/core/interfaces/queries/QueryPaginationProps';
import { QueryTotalProps } from '@/modules/core/interfaces/queries/QueryTotalProps';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/UseQueryGetAllRecordsReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { ShoppingSupplies } from '../../interfaces';

export interface GetShoppingProps
  extends QueryPaginationProps,
    QueryDateProps,
    QueryTotalProps {}

export async function getAllShopping(
  props: GetShoppingProps
): TypeGetAllRecordsReturn<ShoppingSupplies> {
  const params = new URLSearchParams({
    limit: props.limit?.toString() || '10',
    offset: props.offset?.toString() || '0',
  });

  if (props.filter_by_date) {
    params.append('filter_by_date', 'true');
    params.append('type_filter_date', props.type_filter_date || '');
    params.append('date', new Date(props.date || '').toISOString());
  }

  if (props.filter_by_total) {
    params.append('filter_by_total', 'true');
    params.append('type_filter_total', props.type_filter_total || '');
    params.append('total', props.total?.toString() || '0');
  }

  return await cropcoAPI.get(`${pathsCropco.shopping}/all?${params}`);
}

export function useGetAllShopping(
  props: GetShoppingProps
): UseGetAllRecordsReturn<ShoppingSupplies> {
  const { pagination, setPagination } = usePaginationDataTable();

  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('supplies', 'find_all_supplies_shopping');

  const query: UseQueryGetAllRecordsReturn<ShoppingSupplies> = useQuery({
    queryKey: [
      'shopping',
      {
        ...props,
        ...pagination,
      },
    ],
    queryFn: () =>
      getAllShopping({
        ...props,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
    select: ({ data }) => data,
    staleTime: CACHE_CONFIG_TIME.mediumTerm.staleTime,
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error('No tienes permiso para ver el listado de usuarios 😑');
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
}
