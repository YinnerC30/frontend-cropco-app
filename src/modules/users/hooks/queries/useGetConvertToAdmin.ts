import { useAuthContext, useManageErrorApp } from '@/auth/hooks';
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useEffect } from 'react';
import { User } from '../../interfaces';

async function convertToAdmin(id: string): Promise<User> {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.authentication}/convert-to-admin/one/${id}`
  );
  return data;
}

export function useGetConvertToAdmin(
  id: string,
  isRunning: boolean
): UseQueryResult<User, AxiosError> {
  const { hasPermission, handleError } = useAuthContext();
  const queryClient = useQueryClient();
  const query: UseQueryResult<User, AxiosError> = useQuery({
    queryKey: ['convert-to-admin-user', id],
    queryFn: () => convertToAdmin(id),
    enabled: isRunning && hasPermission('auth', 'convert_to_admin'),
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
        messagesStatusError: {
          unauthorized: 'No tienes permisos para convertir a administrador',
        },
      });
    }
  }, [query.isError]);

  return query;
}
