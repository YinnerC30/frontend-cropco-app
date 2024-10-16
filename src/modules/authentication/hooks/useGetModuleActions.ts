import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { getModuleActions } from '../services/getModuleActions';

export function useGetModuleActions(name: string): UseQueryResult<any, Error> {
  const query = useQuery({
    queryKey: ['module', name],
    queryFn: () => getModuleActions(name),
  });
  return query;
}
