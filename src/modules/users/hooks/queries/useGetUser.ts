import {
  useAuthorization,
  useManageErrorApp,
} from '@/modules/authentication/hooks';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useEffect } from 'react';
import { getUserById } from '../../services';
import { User } from '../../interfaces';

export function useGetUser(id: string): UseQueryResult<User, Error> {
  const { handleError } = useManageErrorApp();

  const { hasPermission } = useAuthorization();

  const query = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: hasPermission('users', 'find_one_user'),
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para obtener la información del usuario',
      });
    }
  }, [query.isError]);

  return query;
}
