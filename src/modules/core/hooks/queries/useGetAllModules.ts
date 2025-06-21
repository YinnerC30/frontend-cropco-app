import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { AxiosError, AxiosResponse } from 'axios';
import { Module } from '../../interfaces/responses/ResponseGetAllModules';
import { CACHE_CONFIG_TIME } from '@/config';

export const getModules = async (): Promise<AxiosResponse<Module[]>> => {
  return await cropcoAPI.get(`${pathsCropco.authentication}/modules/all`);
};

export const useGetAllModules = ({
  executeQuery,
}: {
  executeQuery: boolean;
}): UseQueryResult<Module[], AxiosError<TypedAxiosError, unknown>> => {
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

  return query;
};
