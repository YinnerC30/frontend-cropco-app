import { useManageErrorAuthorization } from '@/modules/authentication/hooks/useManageErrorAuthorization';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { User } from '../interfaces/User';
import { convertToAdmin } from '../services/convertToAdmin';

export function useGetConvertToAdmin(
  id: string,
  isRunning: boolean
): UseQueryResult<User, Error> {
  const { handleError } = useManageErrorAuthorization();
  const query = useQuery({
    queryKey: ['convert-to-admin-user', id],
    queryFn: () => convertToAdmin(id),
    enabled: isRunning,
    gcTime: 60 * 1000 * 60,
  });

  if (query.isError) {
    handleError({
      error: query.error as AxiosError,
      messageUnauthoraizedError: 'No tienes permiso para convertirte en admin',
    });
  }
  return query;
}
