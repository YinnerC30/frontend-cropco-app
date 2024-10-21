import { useQuery } from '@tanstack/react-query';
import { getReportClients } from '../services/getReportClients';

export const useGetReportClients = () => {
  return useQuery({
    queryKey: ['clients-report'],
    queryFn: () => getReportClients(),
  });
};
