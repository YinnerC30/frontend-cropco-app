import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Module } from '../../interfaces/responses/ResponseGetAllModules';
import { CACHE_CONFIG_TIME } from '@/config';
import { AxiosError } from 'axios';

export const getModules = async (): Promise<Module[]> => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.authentication}/modules/all`
  );
  return data;
};

export const useGetAllModules = (): UseQueryResult<Module[], AxiosError> => {
  const query: UseQueryResult<Module[], AxiosError> = useQuery({
    queryKey: ['modules'],
    queryFn: () => getModules(),
    staleTime: CACHE_CONFIG_TIME.longTerm.staleTime,
  });
  return query;
};
