import { useManageErrorAuthorization } from '@/modules/authentication/hooks/useManageErrorAuthorization';
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { User } from '../interfaces/User';
import { convertToAdmin } from '../services/convertToAdmin';
import { useEffect } from 'react';

export function useGetConvertToAdmin(
  id: string,
  isRunning: boolean
): UseQueryResult<User, Error> {
  const { handleError } = useManageErrorAuthorization();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['convert-to-admin-user', id],
    queryFn: () => convertToAdmin(id),
    enabled: isRunning,
    gcTime: 60 * 1000 * 60,
  });

  useEffect(() => {
    if (query.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para convertirte en admin',
      });
    }
  }, [query.isError]);

  return query;
}