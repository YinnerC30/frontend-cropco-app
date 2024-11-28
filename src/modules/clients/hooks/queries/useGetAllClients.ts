import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import {
  useAuthorizationContext,
  useManageErrorApp,
} from '@/modules/authentication/hooks';
import { AxiosError } from 'axios';

export const getClients = async ({ search = '', limit = 10, offset = 0 }) => {
  const params = new URLSearchParams();
  params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.clients}/all?${params}`);
  return data;
};

export const useGetAllClients = (searchParameter: string) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthorizationContext();
  const query = useQuery({
    queryKey: ['clients', { searchParameter, ...pagination }],
    queryFn: () =>
      getClients({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
    enabled: hasPermission('clients', 'find_all_clients'),
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para ver el listado de clientes 😑',
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};
