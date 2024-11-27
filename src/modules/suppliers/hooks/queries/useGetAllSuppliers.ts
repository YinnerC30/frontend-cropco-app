import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';

import { PaginationState } from '@tanstack/react-table';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/modules/authentication/hooks';
import { AxiosError } from 'axios';

export const getSuppliers = async ({ search = '', limit = 10, offset = 0 }) => {
  const params = new URLSearchParams();
  params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  const { data } = await cropcoAPI.get(
    `${pathsCropco.suppliers}/all?${params}`
  );
  return data;
};

export const useGetAllSuppliers = (searchParameter: string) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { handleError } = useManageErrorApp();
  const query = useQuery({
    queryKey: ['suppliers', { searchParameter, ...pagination }],
    queryFn: () =>
      getSuppliers({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para ver el listado de proveedores 😑',
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};
