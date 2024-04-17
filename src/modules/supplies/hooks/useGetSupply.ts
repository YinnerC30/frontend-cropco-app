import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getSupplyById } from '../services/getOne';
import { Supply } from '../interfaces/Supply';

export const useGetSupply = (id: string): UseQueryResult<Supply, Error> => {
  const query = useQuery({
    queryKey: ['supply', id],
    queryFn: () => getSupplyById(id),
  });
  return query;
};
