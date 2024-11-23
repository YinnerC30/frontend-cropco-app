import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getCertificationEmployee = async (id: string) => {
  const response = await cropcoAPI.get(
    `${pathsCropco.employees}/find/certification/one/${id}`,
    {
      responseType: 'blob',
    }
  );
  return response.data;
};

export const useGetCertificationEmployee = (
  id: string,
  executeQuery: boolean
) => {
  const query = useQuery({
    queryKey: ['employee-certification', id],
    queryFn: () => getCertificationEmployee(id),
    staleTime: 60_000,
    enabled: false,
  });
  return query;
};
