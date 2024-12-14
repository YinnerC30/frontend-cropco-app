import { useQuery } from '@tanstack/react-query';


import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { usePaginationDataTable } from '@/modules/core/hooks';

export const getSales = async ({
  limit = 10,
  offset = 0,

  filter_by_date = false,
  type_filter_date = '',
  date = '',

  filter_by_total = false,
  type_filter_total = '',
  total = 0,

  filter_by_quantity = false,
  type_filter_quantity = '',
  quantity = 0,

  filter_by_is_receivable = false,
  is_receivable = 0,
}: any) => {
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

  if (filter_by_quantity) {
    params.append('filter_by_quantity', 'true');
    params.append('type_filter_quantity', type_filter_quantity);
    params.append('quantity', quantity.toString());
  }

  if (filter_by_is_receivable) {
    params.append('filter_by_is_receivable', 'true');
    params.append('is_receivable', is_receivable.toString());
  }
  const { data } = await cropcoAPI.get(`${pathsCropco.sales}/all?${params}`);
  return data;
};

export const useGetAllSales = ({
  filter_by_date = false,
  type_filter_date = '',
  date = '',

  filter_by_total = false,
  type_filter_total = '',
  total = 0,

  filter_by_quantity = false,
  type_filter_quantity = '',
  quantity = 0,

  filter_by_is_receivable = false,
  is_receivable = 0,
}: any) => {
  const { pagination, setPagination, pageIndex, pageSize } =
    usePaginationDataTable();

  const query = useQuery({
    queryKey: [
      'sales',
      {
        filter_by_date,
        type_filter_date,
        date,
        filter_by_total,
        type_filter_total,
        total,
        filter_by_quantity,
        type_filter_quantity,
        quantity,
        filter_by_is_receivable,
        is_receivable,
        ...pagination,
      },
    ],
    queryFn: () =>
      getSales({
        limit: pageSize,
        offset: pageIndex,
        filter_by_date,
        type_filter_date,
        date,
        filter_by_total,
        type_filter_total,
        total,
        filter_by_quantity,
        type_filter_quantity,
        quantity,
        filter_by_is_receivable,
        is_receivable,
      }),
  });

  return { query, pagination, setPagination };
};
