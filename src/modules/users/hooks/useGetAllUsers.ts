import { useQuery } from '@tanstack/react-query';

import { useManageErrorApp } from '@/modules/authentication/hooks/useManageErrorApp';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { ResponseUseGetAllRecords } from '@/modules/core/interfaces';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { User } from '../interfaces';
import { getUsers } from '../services';
import { useAuthorization } from '@/modules/authentication/hooks';

interface Props {
  value: string;
}

const STALE_TIME_DATA = 60_000 * 60;

export function useGetAllUsers({
  value,
}: Props): ResponseUseGetAllRecords<User> {
  const { hasPermission } = useAuthorization();
  const { pagination, setPagination, pageIndex, pageSize } =
    usePaginationDataTable();

  const { handleError } = useManageErrorApp();

  const query = useQuery({
    queryKey: ['users', { value, ...pagination }],
    queryFn: () =>
      getUsers({
        query: value,
        limit: pageSize,
        offset: pageIndex,
      }),
    staleTime: STALE_TIME_DATA,
    enabled: hasPermission('users', 'find_all_users')
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para ver el listado de usuarios 😑',
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
}
