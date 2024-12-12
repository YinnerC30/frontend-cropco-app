import { useQuery } from '@tanstack/react-query';

import { PaginationState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { AxiosError } from 'axios';
import { useAuthContext, useManageErrorApp } from '@/auth/hooks';

interface Props {
  search: string;
  limit: number;
  offset: number;
  allRecords: boolean;
}

export const getCropsWithHarvest = async ({
  search = '',
  limit = 10,
  offset = 0,
  allRecords,
}: Props) => {
  let params = new URLSearchParams();
  params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());
  params.append('allRecords', allRecords.toString());

  const { data } = await cropcoAPI.get(
    `${pathsCropco.crops}/with-harvest/all?${params}`
  );
  return data;
};

interface HookProps {
  searchParameter: string;
  allRecords: boolean;
}

export const useGetAllCropsWithHarvest = ({
  searchParameter,
  allRecords,
}: HookProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthContext();
  const query = useQuery({
    queryKey: ['crops-with-harvest', { searchParameter, ...pagination }],
    queryFn: () =>
      getCropsWithHarvest({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
    enabled:
      hasPermission('crops', 'find_all_crops_with_harvest') &&
      hasPermission('harvests', 'find_all_harvests'),
    staleTime: 60_000 * 60,
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para ver el listado de cultivos con cosechas 😑',
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};
