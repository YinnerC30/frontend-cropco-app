import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Module } from '../../interfaces/responsess/ResponseGetAllModules';
import { CACHE_CONFIG_TIME } from '@/config';
import { AxiosError, AxiosResponse } from 'axios';
import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';

export const getModules = async (): Promise<AxiosResponse<Module[]>> => {
  return await cropcoAPI.get(`${pathsCropco.authentication}/modules/all`);
};

export const useGetAllModules = (): UseQueryResult<
  Module[],
  AxiosError<TypedAxiosError, unknown>
> => {
  const query: UseQueryResult<
    Module[],
    AxiosError<TypedAxiosError, unknown>
  > = useQuery({
    queryKey: ['modules'],
    queryFn: () => getModules(),
    select: ({ data }) => data,
    staleTime: CACHE_CONFIG_TIME.longTerm.staleTime,
  });

  return query;
};
