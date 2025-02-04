import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { AxiosError, AxiosResponse } from 'axios';
import { Module } from '../../interfaces/responses/ResponseGetAllModules';

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
    
  });

  return query;
};
