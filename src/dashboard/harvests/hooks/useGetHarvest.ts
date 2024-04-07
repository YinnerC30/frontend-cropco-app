import { useQuery } from '@tanstack/react-query';
import { getHarvestById } from '../actions/getOne';

export const useGetHarvest = (id: string) => {
  const query = useQuery({
    queryKey: ['harvest', id],
    queryFn: () => getHarvestById(id),
  });
  return query;
};
