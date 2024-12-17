import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { ResponseGetConsumptions } from '../../interfaces/ResponseGetConsumptions';
import { usePaginationDataTable } from '@/modules/core/hooks';

export async function getAllConsumptions({
  limit = 10,
  offset = 0,

  filter_by_date = false,
  type_filter_date = '',
  date = '',
}): Promise<ResponseGetConsumptions> {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  if (filter_by_date) {
    params.append('filter_by_date', 'true');
    params.append('type_filter_date', type_filter_date);
    params.append('date', new Date(date).toISOString());
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
  filter_by_date = false,
  type_filter_date = '',
  date = '',
}: any): Response {
  const { pagination, setPagination, pageIndex, pageSize } =
    usePaginationDataTable();

  const query = useQuery({
    queryKey: [
      'consumptions',
      { filter_by_date, type_filter_date, date, ...pagination },
    ],
    queryFn: () =>
      getAllConsumptions({
        limit: pageSize,
        offset: pageIndex,
        filter_by_date,
        type_filter_date,
        date,
      }),
  });

  return { query, pagination, setPagination };
}
