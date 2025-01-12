import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { CACHE_CONFIG_TIME } from '@/config';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { BasicQueryData } from '@/modules/core/interfaces';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { User } from '../../interfaces';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';

async function getUsers(values: BasicQueryData): TypeGetAllRecordsReturn<User> {
  const { query = '', limit = 10, offset = 0 } = values;

  const params = new URLSearchParams({
    query: query,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  return await cropcoAPI.get(`${pathsCropco.users}/all?${params}`);
}

export function useGetAllUsers({
  value,
}: {
  value: string;
}): UseGetAllRecordsReturn<User> {
  const { hasPermission, handleError } = useAuthContext();

  const { pagination, setPagination } = usePaginationDataTable();

  const isAuthorized = hasPermission('users', 'find_all_users');

  const query: UseQueryGetAllRecordsReturn<User> = useQuery({
    queryKey: ['users', { value, ...pagination }],
    queryFn: () =>
      getUsers({
        query: value,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
    select: ({ data }) => data,
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
