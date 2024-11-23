import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getEmployeeById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.employees}/one/${id}`);
  return data;
};

export const useGetEmployee = (id: string) => {
  const query = useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployeeById(id),
  });
  return query;
};
