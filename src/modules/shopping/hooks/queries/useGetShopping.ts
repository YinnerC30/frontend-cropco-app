import { useQuery } from '@tanstack/react-query';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getShoppingById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.shopping}/one/${id}`);
  return data;
};

export const useGetShopping = (id: string) => {
  const query = useQuery({
    queryKey: ['shopping', id],
    queryFn: () => getShoppingById(id),
  });
  return query;
};
