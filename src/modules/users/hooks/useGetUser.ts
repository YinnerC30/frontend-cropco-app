import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getUserById } from '../services/getOne';
import { User } from '../interfaces/User';

export function useGetUser(id: string): UseQueryResult<User, Error> {
  const query = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  });
  return query;
}
