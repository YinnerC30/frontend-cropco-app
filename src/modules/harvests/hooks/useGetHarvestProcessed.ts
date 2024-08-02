import { useQuery } from '@tanstack/react-query';
import { getHarvestProcessedById } from '../services/getHarvestProcessedById';

export const useGetHarvestProcessed = (id: string) => {
  const query = useQuery({
    queryKey: ['harvest_processed', id],
    queryFn: () => getHarvestProcessedById(id),
  });
  return query;
};
