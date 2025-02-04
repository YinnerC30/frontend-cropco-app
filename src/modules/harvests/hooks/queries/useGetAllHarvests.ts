import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { QueryDateProps } from '@/modules/core/interfaces/queries/QueryDateProps';
import { QueryPaginationProps } from '@/modules/core/interfaces/queries/QueryPaginationProps';
import { QueryTotalProps } from '@/modules/core/interfaces/queries/QueryTotalProps';
import { QueryValuePayProps } from '@/modules/core/interfaces/queries/QueryValuePayProps';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Harvest } from '../../interfaces';

export interface GetHarvestsProps
  extends QueryPaginationProps,
    QueryDateProps,
    QueryTotalProps,
    QueryValuePayProps {
  crop?: string;
  employees?: string[];
}

export const getHarvests = async (
  props: GetHarvestsProps
): TypeGetAllRecordsReturn<Harvest> => {
  const params = new URLSearchParams({
    limit: props.limit?.toString() || '10',
    offset: props.offset?.toString() || '0',
    crop: props.crop || '',
    employees: props.employees?.join(',') || '',
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

  if (props.filter_by_value_pay) {
    params.append('filter_by_value_pay', 'true');
    params.append('type_filter_value_pay', props.type_filter_value_pay || '');
    params.append('value_pay', props.value_pay?.toString() || '0');
  }

  return await cropcoAPI.get(`${pathsCropco.harvests}/all?${params}`);
};

export const useGetAllHarvests = (
  props: GetHarvestsProps
): UseGetAllRecordsReturn<Harvest> => {
  const { pagination, setPagination } = usePaginationDataTable();

  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('harvests', 'find_all_harvests');

  const query: UseQueryGetAllRecordsReturn<Harvest> = useQuery({
    queryKey: [
      'harvests',
      {
        ...props,
        ...pagination,
      },
    ],
    queryFn: () =>
      getHarvests({
        ...props,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
    select: ({ data }) => data,
    
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
};
