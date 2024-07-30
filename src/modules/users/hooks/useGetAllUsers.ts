import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { getUsers } from '../services/getUsers';
import { ResponseGetUsers } from '../interfaces/Response';

interface Response {
  query: UseQueryResult<ResponseGetUsers, Error>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export function useGetAllUsers(searchParameter: string): Response {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ['users', { searchParameter, ...pagination }],
    queryFn: () =>
      getUsers({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  return { query, pagination, setPagination };
}
