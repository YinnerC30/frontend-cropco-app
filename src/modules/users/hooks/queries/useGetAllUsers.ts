import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthorizationContext } from '@/modules/authentication/hooks';
import { useManageErrorApp } from '@/modules/authentication/hooks/useManageErrorApp';
import { usePaginationDataTable } from '@/modules/core/hooks';
import {
  BasicQueryData,
  ResponseApiGetAllRecords,
} from '@/modules/core/interfaces';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { User } from '../../interfaces';
import { toast } from 'sonner';

async function getUsers(
  values: BasicQueryData
): Promise<ResponseApiGetAllRecords<User>> {
  const { query: value = '', limit = 10, offset = 0 } = values;

  const params = new URLSearchParams({
    search: value,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const { data } = await cropcoAPI.get(`${pathsCropco.users}/all?${params}`);
  return data;
}

interface Props {
  value: string;
}

const STALE_TIME_DATA = 60_000 * 60;

export function useGetAllUsers({ value }: Props) {
  const { hasPermission } = useAuthorizationContext();
  const { pagination, setPagination, pageIndex, pageSize } =
    usePaginationDataTable();

  const { handleError } = useManageErrorApp();

  const isAuthorized = hasPermission('users', 'find_all_users');

  const query = useQuery({
    queryKey: ['users', { value, ...pagination }],
    queryFn: () =>
      getUsers({
        query: value,
        limit: pageSize,
        offset: pageIndex,
      }),
    staleTime: STALE_TIME_DATA,
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error('No tienes permiso para ver el listado de usuarios 😑');
    }
  }, [isAuthorized]);

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
