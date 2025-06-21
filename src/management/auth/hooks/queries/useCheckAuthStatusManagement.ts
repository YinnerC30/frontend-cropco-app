import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { CACHE_CONFIG_TIME } from '@/config';
import { useAuthTenantContext } from '../../components/AuthTenantContext';

export interface ResponseCheckAuth {
  message: string;
  statusCode: number;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipInterceptor?: boolean; // Agrega esta propiedad opcional
  }
}

export const checkAuthStatusManagement = async (
  token: string
): PromiseReturnRecord<ResponseCheckAuth> => {
  return await cropcoAPI.get(
    `${pathsCropco.authentication}/management/check-status`,
    {
      headers: {
        'x-administration-token': token,
      },
    }
  );
};

export const useCheckAuthStatusManagement = ({
  token = '',
}: {
  token: string;
}): UseGetOneRecordReturn<ResponseCheckAuth> => {
  const { is_login, handleError } = useAuthTenantContext();
  const query: UseGetOneRecordReturn<ResponseCheckAuth> = useQuery({
    queryKey: ['valid-sesion-user'],
    queryFn: () => checkAuthStatusManagement(token),
    enabled: is_login,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.longTerm,
    retry: false,
  });

  const { isError, error } = query;

  useEffect(() => {
    if (isError) {
      handleError({
        error,
        messagesStatusError: {
          unauthorized: 'Tu sesión ha expirado',
        },
      });
    }
  }, [isError]);

  return query;
};
