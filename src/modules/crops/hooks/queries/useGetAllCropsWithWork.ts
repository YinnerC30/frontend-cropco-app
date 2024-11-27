import { useQuery } from '@tanstack/react-query';

import { PaginationState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { AxiosError } from 'axios';
import {
  useAuthorization,
  useManageErrorApp,
} from '@/modules/authentication/hooks';

interface Props {
  search: string;
  limit: number;
  offset: number;
  allRecords: boolean;
}

export const getCropsWithWork = async ({
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
    `${pathsCropco.crops}/with-work/all?${params}`
  );
  return data;
};

interface HookProps {
  searchParameter: string;
  allRecords: boolean;
}

export const useGetAllCropsWithWork = ({
  searchParameter,
  allRecords,
}: HookProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthorization();
  const query = useQuery({
    queryKey: ['crops-with-work', { searchParameter, ...pagination }],
    queryFn: () =>
      getCropsWithWork({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
    enabled: hasPermission('crops', 'find_all_crops_with_work'),
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para ver el listado de cultivos con trabajos 😑',
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};