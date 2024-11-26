import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getClientById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.clients}/one/${id}`);
  return data;
};

export const useGetClient = (id: string) => {
  const query = useQuery({
    queryKey: ['client', id],
    queryFn: () => getClientById(id),
  });
  return query;
};
