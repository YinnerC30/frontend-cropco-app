import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { useEffect } from 'react';
import { useAuthContext, useManageErrorApp } from '@/auth';
import { AxiosError } from 'axios';

export const getHarvests = async ({
  limit = 10,
  offset = 0,
  crop = '',
  filter_by_date = false,
  type_filter_date = '',
  date = '',

  filter_by_total = false,
  type_filter_total = '',
  total = 0,

  filter_by_value_pay = false,
  type_filter_value_pay = '',
  value_pay = 0,
}) => {
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

  if (filter_by_value_pay) {
    params.append('filter_by_value_pay', 'true');
    params.append('type_filter_value_pay', type_filter_value_pay);
    params.append('value_pay', value_pay.toString());
  }

  const { data } = await cropcoAPI.get(`${pathsCropco.harvests}/all?${params}`);
  return data;
};

export const useGetAllHarvests = ({
  crop,
  filter_by_date,
  type_filter_date,
  date,
  filter_by_total,
  type_filter_total,
  total,
  filter_by_value_pay,
  type_filter_value_pay,
  value_pay,
}: any) => {
  const { pagination, setPagination, pageIndex, pageSize } =
    usePaginationDataTable();
  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthContext();

  const query = useQuery({
    queryKey: [
      'harvests',
      {
        crop,
        filter_by_date,
        type_filter_date,
        date,
        filter_by_total,
        type_filter_total,
        total,
        filter_by_value_pay,
        type_filter_value_pay,
        value_pay,
        ...pagination,
      },
    ],
    queryFn: () =>
      getHarvests({
        limit: pageSize,
        offset: pageIndex,
        crop,
        filter_by_date,
        type_filter_date,
        date,
        filter_by_total,
        type_filter_total,
        total,
        filter_by_value_pay,
        type_filter_value_pay,
        value_pay,
      }),
    staleTime: 60_000 * 60,
    enabled: hasPermission('harvests', 'find_all_harvests'),
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para ver el listado de cosechas 😑',
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};
