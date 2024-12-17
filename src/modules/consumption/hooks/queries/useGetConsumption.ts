import { useQuery } from '@tanstack/react-query';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getConsumptionById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.consumption}/one/${id}`);
  return data;
};

export const useGetConsumption = (id: string) => {
  const query = useQuery({
    queryKey: ['consumptions', id],
    queryFn: () => getConsumptionById(id),
  });
  return query;
};
