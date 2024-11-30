import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getHarvestById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.harvests}/one/${id}`);
  return data;
};

export const useGetHarvest = (id: string) => {
  const query = useQuery({
    queryKey: ['harvest', id],
    queryFn: () => getHarvestById(id),
  });
  return query;
};
