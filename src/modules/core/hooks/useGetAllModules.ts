import { useQuery } from '@tanstack/react-query';
import { getModules } from '../services/getModules';

export const useGetAllModules = () => {
  const query = useQuery({
    queryKey: ['modules'],
    queryFn: () => getModules(),
    staleTime: 1000 * 60 * 60 * 7,
  });

  return query;
};
