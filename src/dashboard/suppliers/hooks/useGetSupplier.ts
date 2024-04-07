import { useQuery } from '@tanstack/react-query';
import { getSupplierById } from '../actions/getOne';

export const useGetSupplier = (id: string) => {
  const query = useQuery({
    queryKey: ['supplier', id],
    queryFn: () => getSupplierById(id),
  });
  return query;
};
