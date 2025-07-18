import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { useAuthContext } from '..';
import { TIME_ACTIVE_TOKEN } from '../../components/AuthContext';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { CACHE_CONFIG_TIME } from '@/config';

export interface ResponseCheckAuth {
  message: string;
  statusCode: number;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipInterceptor?: boolean; // Agrega esta propiedad opcional
  }
}

export const checkAuthStatus =
  async (): PromiseReturnRecord<ResponseCheckAuth> => {
    return await cropcoAPI.get(`${pathsCropco.authentication}/check-status`);
  };

export const useCheckAuthStatus =
  (): UseGetOneRecordReturn<ResponseCheckAuth> => {
    const { is_login, handleError } = useAuthContext();
    const query: UseGetOneRecordReturn<ResponseCheckAuth> = useQuery({
      queryKey: ['valid-sesion-user'],
      queryFn: () => checkAuthStatus(),
      enabled: is_login,
      refetchOnWindowFocus: false,
      // refetchIntervalInBackground
      ...CACHE_CONFIG_TIME.longTerm,
      refetchInterval: TIME_ACTIVE_TOKEN,
      retry: false,
    });

    const { isError, error } = query;

    useEffect(() => {
      if (isError) {
        handleError({
          error,
          handlers: {},
        });
      }
    }, [isError]);

    return query;
  };
