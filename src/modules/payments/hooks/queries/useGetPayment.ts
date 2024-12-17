import { useQuery } from '@tanstack/react-query';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getPaymentById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.payments}/one/${id}`);
  return data;
};

export const useGetPayment = (id: string) => {
  const query = useQuery({
    queryKey: ['payment', id],
    queryFn: () => getPaymentById(id),
  });
  return query;
};
