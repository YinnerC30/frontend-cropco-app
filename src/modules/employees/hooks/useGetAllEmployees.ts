import { useQuery } from '@tanstack/react-query';

import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { getEmployees } from '../services/getAll';

interface Props {
  searchParameter: string;
  allRecords: boolean;
}

export const useGetAllEmployees = ({ searchParameter, allRecords }: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ['employees', { searchParameter, ...pagination }],
    queryFn: () =>
      getEmployees({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
  });

  return { query, pagination, setPagination };
};
