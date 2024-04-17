import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../actions/getOne';


export const useGetUser = (id: string) => {
  const query = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  });
  return query;
};
