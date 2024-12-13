import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Work } from '../../interfaces/Work';

export async function getWorkById(id: string): Promise<Work> {
  const { data } = await cropcoAPI.get(`${pathsCropco.works}/one/${id}`);
  return data[0];
}

export function useGetWork(id: string): UseQueryResult<Work, Error> {
  const query = useQuery({
    queryKey: ['works', id],
    queryFn: () => getWorkById(id),
  });
  return query;
}
