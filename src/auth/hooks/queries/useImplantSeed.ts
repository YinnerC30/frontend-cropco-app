import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { cropcoAPI } from '@/api/cropcoAPI';

export const implantSeed = async () => {
  return await cropcoAPI.get(`/seed`);
};

export function useImplantSeed(
  isRunningSeed: boolean
): UseQueryResult<any, Error> {
  const query = useQuery({
    queryKey: ['seed'],
    queryFn: () => implantSeed(),
    enabled: isRunningSeed,
  });

  return query;
}
