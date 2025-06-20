import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { BasicQueryData } from '@/modules/core/interfaces';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { CACHE_CONFIG_TIME } from '@/config';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';
import { Administrator } from '../../interfaces/Administrator';

async function getAdministrators(
  values: BasicQueryData
): TypeGetAllRecordsReturn<Administrator> {
  const { query = '', limit = 10, offset = 0 } = values;

  const params = new URLSearchParams({
    query: query,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  return await cropcoAPI.get(`${pathsCropco.tenants}/all/admin?${params}`);
}

export function useGetAllAdministrators({
  value,
}: {
  value: string;
}): UseGetAllRecordsReturn<Administrator> {
  const { handleError } = useAuthTenantContext();

  const { pagination, setPagination } = usePaginationDataTable();

  const query: UseQueryGetAllRecordsReturn<Administrator> = useQuery({
    queryKey: ['administrators', { value, ...pagination }],
    queryFn: () =>
      getAdministrators({
        query: value,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
    select: ({ data }) => data,
    // enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.longTerm,
  });

  // useEffect(() => {
  //   if (!isAuthorized) {
  //     toast.error('No tienes permiso para ver el listado de usuarios 😑');
  //   }
  // }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {
          badRequest: 'La solicitud contiene información incorrecta',
          unauthorized: 'No tienes permiso para ver el listado de usuarios 😑',
        },
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
}
