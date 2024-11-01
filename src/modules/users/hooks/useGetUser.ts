import { useManageErrorApp } from '@/modules/authentication/hooks';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { User } from '../interfaces/User';
import { getUserById } from '../services/getUserById';

export function useGetUser(id: string): UseQueryResult<User, Error> {
  const { handleError } = useManageErrorApp();
  const query = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  });

  if (query.isError) {
    handleError({
      error: query.error as AxiosError,
      messageUnauthoraizedError:
        'No tienes permiso para obtener la información del usuario',
    });
  }
  return query;
}
