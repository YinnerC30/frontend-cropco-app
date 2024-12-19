import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { cropcoAPI } from '@/api/cropcoAPI';

export const implantSeed = async (): Promise<void> => {
  return await cropcoAPI.get(`/seed`);
};

export function useImplantSeed(
  isRunningSeed: boolean
): UseQueryResult<void, Error> {
  const query: UseQueryResult<void, Error> = useQuery({
    queryKey: ['seed'],
    queryFn: () => implantSeed(),
    enabled: isRunningSeed,
  });

  return query;
}
