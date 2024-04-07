import { useQuery } from '@tanstack/react-query';
import { getClients } from '../actions/getAll';
import { useState } from 'react';
import { PaginationState } from '@tanstack/react-table';

export const useGetAllClients = (searchParameter: string) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ['clients', { searchParameter, ...pagination }],
    queryFn: () =>
      getClients({
        parameter: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  return { query, pagination, setPagination };
};
