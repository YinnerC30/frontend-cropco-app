import { useQuery } from '@tanstack/react-query';

import { useManageErrorApp } from '@/modules/authentication/hooks/useManageErrorApp';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { ResponseUseGetAllRecords } from '@/modules/core/interfaces';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { User } from '../interfaces';
import { getUsers } from '../services';

interface Props {
  value: string;
}

export function useGetAllUsers({
  value,
}: Props): ResponseUseGetAllRecords<User> {
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
    staleTime: 10 * 1000,
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
