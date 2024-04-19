import { useQuery } from '@tanstack/react-query';
import { getCropById } from '../services/getOne';


export const useGetCrop = (id: string) => {
  const query = useQuery({
    queryKey: ['crop', id],
    queryFn: () => getCropById(id),
  });
  return query;
};
