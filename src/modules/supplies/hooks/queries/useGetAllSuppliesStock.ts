import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

interface HookProps {
  searchParameter: string;
  allRecords: boolean;
}

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { ResponseApiGetAllRecords } from '@/modules/core/interfaces';

import {
  useAuthContext,
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

export const getAllSuppliesStock = async ({
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

  const { data } = await cropcoAPI.get(
    `${pathsCropco.supplies}/stock/all?${params}`
  );
  return data;
};

export const useGetAllSuppliesStock = ({
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
    queryKey: ['supplies', { searchParameter, ...pagination }],
    queryFn: () =>
      getAllSuppliesStock({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
    enabled: hasPermission('supplies', 'find_all_supplies_with_stock'),
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para ver el listado de suministros con Stock 😑',
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};
