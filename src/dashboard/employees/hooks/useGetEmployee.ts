import { useQuery } from '@tanstack/react-query';
import { getEmployeeById } from '../actions/getOne';

export const useGetEmployee = (id: string) => {
  const query = useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployeeById(id),
  });
  return query;
};
