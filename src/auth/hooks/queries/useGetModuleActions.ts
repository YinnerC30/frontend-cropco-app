import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Module } from '@/modules/core/interfaces';

// INFO: Metodo de uso solo en desarrollo
export const getModuleActions = async (name: string): Promise<Module> => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.authentication}/modules/one/${name}`
  );
  return data;
};

export function useGetModuleActions(
  name: string
): UseQueryResult<Module, Error> {
  const query = useQuery({
    queryKey: ['module', name],
    queryFn: () => getModuleActions(name),
    staleTime: 60 * 1000 * 60 * 5,
  });
  return query;
}
