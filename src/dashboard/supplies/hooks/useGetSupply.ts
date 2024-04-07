import { useQuery } from '@tanstack/react-query';
import { getSupplyById } from '../actions/getOne';

export const useGetSupply = (id: string) => {
  const query = useQuery({
    queryKey: ['supply', id],
    queryFn: () => getSupplyById(id),
  });
  return query;
};
