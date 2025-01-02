import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { QueryDateProps } from '@/modules/core/interfaces/queries/QueryDateProps';
import { QueryPaginationProps } from '@/modules/core/interfaces/queries/QueryPaginationProps';
import { QueryTotalProps } from '@/modules/core/interfaces/queries/QueryTotalProps';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Sale } from '../../interfaces';

export interface GetSalesProps
  extends QueryPaginationProps,
    QueryDateProps,
    QueryTotalProps {
  filter_by_quantity?: boolean;
  type_filter_quantity?: string;
  quantity?: number;

  filter_by_is_receivable?: boolean;
  is_receivable?: boolean;
}

export const getSales = async (
  props: GetSalesProps
): TypeGetAllRecordsReturn<Sale> => {
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

  if (props.filter_by_quantity) {
    params.append('filter_by_quantity', 'true');
    params.append('type_filter_quantity', props.type_filter_quantity || '');
    params.append('quantity', props.quantity?.toString() || '0');
  }

  if (props.filter_by_is_receivable) {
    params.append('filter_by_is_receivable', 'true');
    params.append('is_receivable', props?.is_receivable?.toString() || 'false');
  }
  const { data } = await cropcoAPI.get(`${pathsCropco.sales}/all?${params}`);
  return data;
};

export const useGetAllSales = (
  props: GetSalesProps
): UseGetAllRecordsReturn<Sale> => {
  const { pagination, setPagination } = usePaginationDataTable();

  const { handleError, hasPermission } = useAuthContext();

  const isAuthorized = hasPermission('sales', 'find_all_sales');

  const query: UseQueryGetAllRecordsReturn<Sale> = useQuery({
    queryKey: [
      'sales',
      {
        ...props,
        ...pagination,
      },
    ],
    queryFn: () =>
      getSales({
        ...props,
        offset: pagination.pageIndex,
        limit: pagination.pageSize,
      }),
    select: ({ data }) => data,
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error('No tienes permiso para ver el listado de ventas 😑');
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
