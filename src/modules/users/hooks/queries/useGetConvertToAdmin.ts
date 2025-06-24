import { useAuthContext } from '@/auth/hooks';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';
import { User } from '../../interfaces';
import { CACHE_CONFIG_TIME } from '@/config';
import { getEnvironmentVariables } from '@/modules/core/helpers/getEnvironmentVariables';

async function convertToAdmin(id: string): PromiseReturnRecord<User> {
  return await cropcoAPI.get(
    `${pathsCropco.authentication}/convert-to-admin/one/${id}`
  );
}

export function useGetConvertToAdmin(
  id: string,
  isRunning: boolean
): UseGetOneRecordReturn<User> {
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission('auth', 'convert_to_admin');
  const queryClient = useQueryClient();
  const query: UseGetOneRecordReturn<User> = useQuery({
    queryKey: ['convert-to-admin-user', id],
    queryFn: () => convertToAdmin(id),
    select: ({ data }) => data,
    enabled:
      isRunning &&
      isAuthorized &&
      getEnvironmentVariables().STATUS_PROJECT === 'development',
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.shortTerm,
  });

  useEffect(() => {
    if (query.isSuccess) {
      queryClient
        .invalidateQueries({ queryKey: ['user', id] })
        .then(() => console.log('User converted to admin'));
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        handlers: {},
      });
    }
  }, [query.isError]);

  return query;
}
