import { useQuery } from '@tanstack/react-query';

import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { getCrops } from '../actions/getAll';

interface Props {
  searchParameter: string;
  allRecords: boolean;
}

export const useGetAllCrops = ({ searchParameter, allRecords }: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ['crops', { searchParameter, ...pagination }],
    queryFn: () =>
      getCrops({
        parameter: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
  });

  return { query, pagination, setPagination };
};