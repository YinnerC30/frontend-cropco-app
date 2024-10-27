import { useQuery } from '@tanstack/react-query';

import { useManageErrorAuthorization } from '@/modules/authentication/hooks/useManageErrorAuthorization';
import { ResponseUseGetAllRecords } from '@/modules/core/interfaces/ResponseUseGetAllRecords';
import { PaginationState } from '@tanstack/react-table';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { User } from '../interfaces/User';
import { getUsers } from '../services/getUsers';

interface Props {
  value: string;
}

export function useGetAllUsers({
  value,
}: Props): ResponseUseGetAllRecords<User> {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { handleError } = useManageErrorAuthorization();
  const query = useQuery({
    queryKey: ['users', { value, ...pagination }],
    queryFn: () =>
      getUsers({
        query: value,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  if (query.isError) {
    handleError({
      error: query.error as AxiosError,
      messageUnauthoraizedError:
        'No tienes permiso para ver el listado de usuarios 😑',
    });
  }

  return { query, pagination, setPagination };
}
