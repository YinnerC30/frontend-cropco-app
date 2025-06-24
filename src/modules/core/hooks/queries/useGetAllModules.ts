import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { AxiosError, AxiosResponse } from 'axios';
import { Module } from '../../interfaces/responses/ResponseGetAllModules';
import { CACHE_CONFIG_TIME } from '@/config';
import { useEffect } from 'react';
import { useHandlerError } from '@/auth/hooks/errors/useHandlerError';

export const getModules = async (): Promise<AxiosResponse<Module[]>> => {
  return await cropcoAPI.get(`${pathsCropco.authentication}/modules/all`);
};

interface UseGetAllModulesProps {
  executeQuery: boolean;
  actionOnError?: () => void;
}

export const useGetAllModules = ({
  executeQuery,
  actionOnError = () => {},
}: UseGetAllModulesProps): UseQueryResult<
  Module[],
  AxiosError<TypedAxiosError, unknown>
> => {
  const { handleErrorByStatus } = useHandlerError();

  const query: UseQueryResult<
    Module[],
    AxiosError<TypedAxiosError, unknown>
  > = useQuery({
    queryKey: ['modules'],
    queryFn: () => getModules(),
    select: ({ data }) => data,
    ...CACHE_CONFIG_TIME.longTerm,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    enabled: executeQuery,
    retry: false,
  });

  useEffect(() => {
    if (query.isError) {
      handleErrorByStatus({
        error: query.error,
        handlers: {
          unauthorized: {
            message: 'No esta autorizado para solicitar esta información',
            onHandle: () => {
              // actionOnError();
            },
          },
          forbidden: {
            message: 'Su sesión ha terminado',
            onHandle: () => {
              actionOnError();
            },
          },
        },
      });
    }
  }, [query.isError, query.error]);

  return query;
};
