import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { PaginationState } from '@tanstack/react-table';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { ResponseGetShopping } from '../../interfaces/ResponseGetShopping';

export async function getAllShopping({
  limit = 10,
  offset = 0,

  filter_by_date = false,
  type_filter_date = '',
  date = '',

  filter_by_total = false,
  type_filter_total = '',
  total = 0,
}): Promise<ResponseGetShopping> {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  if (filter_by_date) {
    params.append('filter_by_date', 'true');
    params.append('type_filter_date', type_filter_date);
    params.append('date', new Date(date).toISOString());
  }

  if (filter_by_total) {
    params.append('filter_by_total', 'true');
    params.append('type_filter_total', type_filter_total);
    params.append('total', total.toString());
  }

  const { data } = await cropcoAPI.get(`${pathsCropco.shopping}/all?${params}`);
  return data;
}

interface Response {
  query: UseQueryResult<ResponseGetShopping, Error>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export function useGetAllShopping({
  filter_by_date = false,
  type_filter_date = '',
  date = '',

  filter_by_total = false,
  type_filter_total = '',
  total = 0,
}: any): Response {
  const { pagination, setPagination, pageIndex, pageSize } =
    usePaginationDataTable();

  const query = useQuery({
    queryKey: [
      'shopping',
      {
        filter_by_date,
        type_filter_date,
        date,
        filter_by_total,
        type_filter_total,
        total,
        ...pagination,
      },
    ],
    queryFn: () =>
      getAllShopping({
        limit: pageSize,
        offset: pageIndex,
        filter_by_date,
        type_filter_date,
        date,
        filter_by_total,
        type_filter_total,
        total,
      }),
  });

  return { query, pagination, setPagination };
}
