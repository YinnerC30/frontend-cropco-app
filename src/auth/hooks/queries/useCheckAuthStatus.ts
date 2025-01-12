import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { useAuthContext } from '..';
import { TIME_ACTIVE_TOKEN } from '../../components/AuthContext';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responsess/UseGetOneRecordReturn';

export interface ResponseCheckAuth {
  message: string;
  statusCode: number;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipInterceptor?: boolean; // Agrega esta propiedad opcional
  }
}

export const checkAuthStatus = async (
  token: string
): PromiseReturnRecord<ResponseCheckAuth> => {
  return await cropcoAPI.get(`${pathsCropco.authentication}/check-status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    skipInterceptor: true,
  });
};

export const useCheckAuthStatus = ({
  token = '',
}: {
  token: string;
}): UseGetOneRecordReturn<ResponseCheckAuth> => {
  const { isLogin, handleError } = useAuthContext();
  const query: UseGetOneRecordReturn<ResponseCheckAuth> = useQuery({
    queryKey: ['valid-sesion-user'],
    queryFn: () => checkAuthStatus(token),
    enabled: isLogin,
    refetchInterval: TIME_ACTIVE_TOKEN,
    retry: 0,
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
