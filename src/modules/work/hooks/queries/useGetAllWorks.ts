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
import { Work } from '../../interfaces/Work';

export interface GetWorksProps
  extends QueryPaginationProps,
    QueryDateProps,
    QueryTotalProps {
  crop?: string;
  employees?: string[];
}

export const getWorks = async (
  props: GetWorksProps
): TypeGetAllRecordsReturn<Work> => {
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

  return await cropcoAPI.get(`${pathsCropco.works}/all?${params}`);
};

export const useGetAllWorks = (
  props: GetWorksProps
): UseGetAllRecordsReturn<Work> => {
  const { pagination, setPagination } = usePaginationDataTable();

  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission('works', 'find_one_work');

  const query: UseQueryGetAllRecordsReturn<Work> = useQuery({
    queryKey: [
      'works',
      {
        ...props,
        ...pagination,
      },
    ],
    queryFn: () =>
      getWorks({
        ...props,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
    select: ({ data }) => data,
    
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso de lectura para obtener la información de los trabajos solicitados'
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
