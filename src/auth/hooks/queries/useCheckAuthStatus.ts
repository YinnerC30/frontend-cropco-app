import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { useAuthContext } from '..';
import { TIME_ACTIVE_TOKEN } from '../../components/AuthContext';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

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
): Promise<ResponseCheckAuth> => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.authentication}/check-status`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      skipInterceptor: true,
    }
  );
  return data;
};

export const useCheckAuthStatus = ({
  token = '',
}: {
  token: string;
}): UseQueryResult<ResponseCheckAuth, AxiosError> => {
  const { isLogin, handleError } = useAuthContext();
  const query: UseQueryResult<ResponseCheckAuth, AxiosError> = useQuery({
    queryKey: ['valid-sesion-user'],
    queryFn: () => checkAuthStatus(token),
    enabled: isLogin,
    refetchInterval: TIME_ACTIVE_TOKEN,
    retry: 0,
  });

  const { isError, error } = query;

  useEffect(() => {
    if (isError) {
      const loginError: AxiosError | any = error;
      handleError({
        error: loginError,
        messagesStatusError: {
          unauthorized: 'Tu sesión ha expirado',
        },
      });
    }
  }, [isError]);

  return query;
};
