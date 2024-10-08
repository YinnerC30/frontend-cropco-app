import { useQuery } from '@tanstack/react-query';
import { getHarvestById } from '../services/getHarvestById';

export const useGetHarvest = (id: string) => {
  const query = useQuery({
    queryKey: ['harvest', id],
    queryFn: () => getHarvestById(id),
  });
  return query;
};
