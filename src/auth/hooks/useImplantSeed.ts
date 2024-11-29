import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { implantSeed } from '../services/implantSeed';

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
