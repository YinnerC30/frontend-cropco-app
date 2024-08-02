import { useQuery } from '@tanstack/react-query';
import { getSupplierById } from '../services/getSupplierById';

export const useGetSupplier = (id: string) => {
  const query = useQuery({
    queryKey: ['supplier', id],
    queryFn: () => getSupplierById(id),
  });
  return query;
};
