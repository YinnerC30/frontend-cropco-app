import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { CACHE_CONFIG_TIME } from '@/config';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { QueryDateProps } from '@/modules/core/interfaces/queries/QueryDateProps';
import { QueryPaginationProps } from '@/modules/core/interfaces/queries/QueryPaginationProps';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/UseQueryGetAllRecordsReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { ConsumptionSupplies } from '../../interfaces';

export interface GetConsumptionsProps
  extends QueryPaginationProps,
    QueryDateProps {}

export async function getAllConsumptions(
  props: GetConsumptionsProps
): TypeGetAllRecordsReturn<ConsumptionSupplies> {
  const params = new URLSearchParams({
    limit: props.limit?.toString() || '10',
    offset: props.offset?.toString() || '0',
  });

  if (props.filter_by_date) {
    params.append('filter_by_date', 'true');
    params.append('type_filter_date', props.type_filter_date || '');
    params.append('date', new Date(props.date || '').toISOString());
  }
  return await cropcoAPI.get(`${pathsCropco.consumption}/all?${params}`);
}

export function useGetAllConsumptions(
  props: GetConsumptionsProps
): UseGetAllRecordsReturn<ConsumptionSupplies> {
  const { pagination, setPagination } = usePaginationDataTable();

  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission(
    'supplies',
    'find_all_supplies_consumption'
  );

  const query: UseQueryGetAllRecordsReturn<ConsumptionSupplies> = useQuery({
    queryKey: ['consumptions', { ...props, ...pagination }],
    queryFn: () =>
      getAllConsumptions({
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
      toast.error(
        'No tienes permiso para ver el listado de consumos de insumos 😑'
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
}
