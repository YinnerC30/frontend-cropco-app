import { useManageErrorAuthorization } from '@/modules/authentication/hooks/useManageErrorAuthorization';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { User } from '../interfaces/User';
import { getUserById } from '../services/getUserById';

export function useGetUser(id: string): UseQueryResult<User, Error> {
  const { handleError } = useManageErrorAuthorization();
  const query = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  });

  if (query.isError) {
    handleError({
      error: query.error as AxiosError,
      messageUnauthoraizedError: 'No tienes permiso para obtener 1 usuario',
    });
  }
  return query;
}
