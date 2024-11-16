import { useManageErrorApp } from '@/modules/authentication/hooks';
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useEffect } from 'react';
import { User } from '../../interfaces';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

async function convertToAdmin(id: string): Promise<User> {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.authentication}/convert-to-admin/one/${id}`
  );
  return data;
}

export function useGetConvertToAdmin(
  id: string,
  isRunning: boolean
): UseQueryResult<User, Error> {
  const { handleError } = useManageErrorApp();
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
