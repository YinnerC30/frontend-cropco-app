import { useQuery } from '@tanstack/react-query';


import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { usePaginationDataTable } from '@/modules/core/hooks';

export const getWorks = async ({
  limit = 10,
  offset = 0,
  crop = '',
  filter_by_date = false,
  type_filter_date = '',
  date = '',

  filter_by_total = false,
  type_filter_total = '',
  total = 0,
}: any) => {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());
  params.append('offset', offset.toString());
  params.append('crop', crop.toString());

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

  const { data } = await cropcoAPI.get(`${pathsCropco.works}/all?${params}`);
  return data;
};

export const useGetAllWorks = ({
  crop,
  filter_by_date,
  type_filter_date,
  date,
  filter_by_total,
  type_filter_total,
  total,
}: any) => {
  const { pagination, setPagination, pageIndex, pageSize } =
    usePaginationDataTable();

  const query = useQuery({
    queryKey: [
      'works',
      {
        crop,
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
      getWorks({
        limit: pageSize,
        offset: pageIndex,
        crop,
        filter_by_date,
        type_filter_date,
        date,
        filter_by_total,
        type_filter_total,
        total,
      }),
  });

  return { query, pagination, setPagination };
};
