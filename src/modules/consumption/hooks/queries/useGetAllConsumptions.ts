import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { ResponseGetConsumptions } from '../../interfaces/ResponseGetConsumptions';

export async function getAllConsumptions({
  search = '',
  limit = 10,
  offset = 0,
  after_date = '',
  before_date = '',
}): Promise<ResponseGetConsumptions> {
  const params = new URLSearchParams();
  params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  if (after_date.length > 0) {
    params.append('after_date', new Date(after_date).toISOString());
  }
  if (before_date.length > 0) {
    params.append('before_date', new Date(before_date).toISOString());
  }

  const { data } = await cropcoAPI.get(
    `${pathsCropco.consumption}/all?${params}`
  );
  return data;
}

interface Response {
  query: UseQueryResult<ResponseGetConsumptions, Error>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export function useGetAllConsumptions({
  before_date,
  after_date,
}: any): Response {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ['consumptions', { before_date, after_date, ...pagination }],
    queryFn: () =>
      getAllConsumptions({
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        before_date,
        after_date,
      }),
  });

  return { query, pagination, setPagination };
}
