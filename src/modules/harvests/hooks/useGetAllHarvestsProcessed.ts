import { useQuery } from '@tanstack/react-query';

import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { getHarvestsProcessed } from '../services/getAllHarvestProcessed';

export const useGetAllHarvestsProcessed = (searchParameter: string) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ['harvests_processed', { searchParameter, ...pagination }],
    queryFn: () =>
      getHarvestsProcessed({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  return { query, pagination, setPagination };
};
