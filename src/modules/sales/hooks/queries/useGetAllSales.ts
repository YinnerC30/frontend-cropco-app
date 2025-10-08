import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { CACHE_CONFIG_TIME } from '@/config';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { QueryAmountWithMassUnitOfMeasureProps } from '@/modules/core/interfaces/queries/QueryAmountWithMassUnitOfMeasure';
import { QueryDateProps } from '@/modules/core/interfaces/queries/QueryDateProps';
import { QueryPaginationProps } from '@/modules/core/interfaces/queries/QueryPaginationProps';
import { QueryValuePayProps } from '@/modules/core/interfaces/queries/QueryValuePayProps';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Sale } from '../../interfaces';

export interface GetSalesProps
  extends QueryPaginationProps,
    QueryDateProps,
    QueryAmountWithMassUnitOfMeasureProps,
    QueryValuePayProps {
  filter_by_is_receivable?: boolean;
  is_receivable?: boolean;

  clients: string[];
  crops: string[];
}

export const getSales = async (
  props: GetSalesProps
): TypeGetAllRecordsReturn<Sale> => {
  const params = new URLSearchParams({
    limit: props.limit?.toString() || '10',
    offset: props.offset?.toString() || '0',
    clients: props.clients?.join(',') || '',
    crops: props.crops?.join(',') || '',
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

  if (props.filter_by_amount) {
    params.append('filter_by_amount', 'true');
    params.append('type_filter_amount', props.type_filter_amount || '');
    params.append('amount', props.amount?.toString() || '0');
    params.append('type_unit_of_measure', props.type_unit_of_measure || '');
  }

  if (props.filter_by_is_receivable) {
    params.append('filter_by_is_receivable', 'true');
    params.append('is_receivable', props?.is_receivable?.toString() || 'false');
  }
  return await cropcoAPI.get(`${pathsCropco.sales}/all?${params}`);
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
    select: ({ data }) => {
      return {
        ...data,
        records: data.records.map((re) => {
          return {
            ...re,
            details: re.details.map((de) => {
              return {
                ...de,
                client: {
                  ...de.client,
                  full_name: de.client.first_name + ' ' + de.client.last_name,
                },
              };
            }),
          };
        }),
      };
    },
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.mediumTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error('No tienes permiso para ver el listado de ventas ');
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
