import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { QueryDateProps } from '@/modules/core/interfaces/queries/QueryDateProps';
import { QueryPaginationProps } from '@/modules/core/interfaces/queries/QueryPaginationProps';
import { QueryValuePayProps } from '@/modules/core/interfaces/queries/QueryValuePayProps';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { ShoppingSupplies } from '../../interfaces';
import { CACHE_CONFIG_TIME } from '@/config';

export interface GetShoppingProps
  extends QueryPaginationProps,
    QueryDateProps,
    QueryValuePayProps {
  suppliers: [];
  supplies: [];
}

export async function getAllShopping(
  props: GetShoppingProps
): TypeGetAllRecordsReturn<ShoppingSupplies> {
  const params = new URLSearchParams({
    limit: props.limit?.toString() || '10',
    offset: props.offset?.toString() || '0',
    suppliers: props.suppliers?.join(',') || '',
    supplies: props.supplies?.join(',') || '',
  });

  if (props.filter_by_date) {
    params.append('filter_by_date', 'true');
    params.append('type_filter_date', props.type_filter_date || '');
    params.append('date', new Date(props.date || '').toISOString());
  }

  if (props.filter_by_value_pay) {
    params.append('filter_by_value_pay', 'true');
    params.append('type_filter_value_pay', props.type_filter_value_pay || '');
    params.append('value_pay', props.value_pay?.toString() || '0');
  }

  return await cropcoAPI.get(`${pathsCropco.shopping}/all?${params}`);
}

export function useGetAllShopping(
  props: GetShoppingProps
): UseGetAllRecordsReturn<ShoppingSupplies> {
  const { pagination, setPagination } = usePaginationDataTable();

  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('shopping', 'find_all_supplies_shopping');

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

    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.mediumTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error('No tienes permiso para ver el listado de compras 😑');
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
