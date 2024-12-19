import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getModuleActions = async (name: string) => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.authentication}/modules/one/${name}`
  );
  return data;
};

export function useGetModuleActions(name: string): UseQueryResult<any, Error> {
  const query = useQuery({
    queryKey: ['module', name],
    queryFn: () => getModuleActions(name),
    staleTime: 60 * 1000 * 60 * 5,
  });
  return query;
}
