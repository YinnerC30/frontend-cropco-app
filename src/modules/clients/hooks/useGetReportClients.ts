import { useQuery } from '@tanstack/react-query';
import { getReportClients } from '../services/getReportClients';

export const useGetReportClients = () => {
  const query = useQuery({
    queryKey: ['report'],
    queryFn: () => getReportClients(),
  });

  return query;
};
