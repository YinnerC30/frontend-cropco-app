import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../actions/getAll';
import { useState } from 'react';
import { PaginationState } from '@tanstack/react-table';

export const useGetAllUsers = (searchParameter: string) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ['users', { searchParameter, ...pagination }],
    queryFn: () =>
      getUsers({
        parameter: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  return { query, pagination, setPagination };
};
