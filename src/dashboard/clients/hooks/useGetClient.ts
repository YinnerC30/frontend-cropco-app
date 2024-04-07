import { useQuery } from '@tanstack/react-query';
import { getClientById } from '../actions/getOne';

export const useGetClient = (id: string) => {
  const query = useQuery({
    queryKey: ['client', id],
    queryFn: () => getClientById(id),
  });
  return query;
};
