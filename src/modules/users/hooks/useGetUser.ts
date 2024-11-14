import { useManageErrorApp } from '@/modules/authentication/hooks';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { User } from '../interfaces/User';
import { getUserById } from '../services/getUserById';
import { useEffect } from 'react';
import { useAuthorization } from '../../authentication/hooks/useAuthorization';

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
  }, [])



  return query;
}
