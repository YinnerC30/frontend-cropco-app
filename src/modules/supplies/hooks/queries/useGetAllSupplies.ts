import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { ResponseApiGetAllRecords } from '@/modules/core/interfaces';

import {
  useAuthorizationContext,
  useManageErrorApp,
} from '@/modules/authentication/hooks';
import { AxiosError } from 'axios';
import { Supply } from '../../interfaces/Supply';

interface Props {
  search: string;
  limit: number;
  offset: number;
  allRecords: boolean;
}

export const getSupplies = async ({
  search = '',
  limit = 10,
  offset = 0,
  allRecords = false,
}: Props): Promise<ResponseApiGetAllRecords<Supply>> => {
  let params = new URLSearchParams();
  params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());
  params.append('allRecords', allRecords.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.supplies}/all?${params}`);
  return data;
};

interface HookProps {
  searchParameter: string;
  allRecords: boolean;
}

export const useGetAllSupplies = ({
  searchParameter,
  allRecords,
}: HookProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthorizationContext();
  const query = useQuery({
    queryKey: ['supplies', { searchParameter, ...pagination }],
    queryFn: () =>
      getSupplies({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
    enabled: hasPermission('supplies', 'find_all_supplies'),
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para ver el listado de suministros 😑',
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};
