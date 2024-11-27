import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Module } from '../../interfaces/responses/ResponseGetAllModules';

export const getModules = async (): Promise<Module[]> => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.authentication}/modules/all`
  );
  return data;
};

export const useGetAllModules = () => {
  const query = useQuery({
    queryKey: ['modules'],
    queryFn: () => getModules(),
    staleTime: 1000 * 60 * 60 * 7,
  });

  return query;
};
