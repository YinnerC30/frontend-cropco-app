import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { HarvestProcessed } from '@/modules/harvests/interfaces/HarvestProcessed';

export const getHarvestProcessedById = async (
  id: string
): Promise<HarvestProcessed> => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.harvestsProcessed}/one/${id}`
  );
  return data;
};

export const useGetHarvestProcessed = (id: string) => {
  const query = useQuery({
    queryKey: ['harvest_processed', id],
    queryFn: () => getHarvestProcessedById(id),
  });
  return query;
};
