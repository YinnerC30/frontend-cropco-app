import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { CACHE_CONFIG_TIME } from '@/config';
import { usePaginationDataTable } from '@/modules/core/hooks';
import {
  BasicQueryData,
  ResponseApiGetAllRecords,
} from '@/modules/core/interfaces';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { User } from '../../interfaces';

interface UseGetAllUsersProps {
  value: string;
}

interface UseGetAllUsersReturn {
  query: UseQueryResult<ResponseApiGetAllRecords<User>, AxiosError>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

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

export function useGetAllUsers({
  value,
}: UseGetAllUsersProps): UseGetAllUsersReturn {
  const { hasPermission, handleError } = useAuthContext();

  const { pagination, setPagination } = usePaginationDataTable();

  const isAuthorized = hasPermission('users', 'find_all_users');

  const query: UseQueryResult<
    ResponseApiGetAllRecords<User>,
    AxiosError
  > = useQuery({
    queryKey: ['users', { value, ...pagination }],
    queryFn: () =>
      getUsers({
        query: value,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
    staleTime: CACHE_CONFIG_TIME.mediumTerm.staleTime,
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
        messagesStatusError: {
          badRequest: 'La solicitud contiene información incorrecta',
          unauthorized: 'No tienes permiso para ver el listado de usuarios 😑',
        },
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
}
