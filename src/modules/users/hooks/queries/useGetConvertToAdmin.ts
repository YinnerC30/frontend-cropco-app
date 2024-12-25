import { useAuthContext } from '@/auth/hooks';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';
import { User } from '../../interfaces';

async function convertToAdmin(id: string): PromiseReturnRecord<User> {
  return await cropcoAPI.get(
    `${pathsCropco.authentication}/convert-to-admin/one/${id}`
  );
}

export function useGetConvertToAdmin(
  id: string,
  isRunning: boolean
): UseGetOneRecordReturn<User> {
  const { hasPermission, handleError } = useAuthContext();
  const queryClient = useQueryClient();
  const query: UseGetOneRecordReturn<User> = useQuery({
    queryKey: ['convert-to-admin-user', id],
    queryFn: () => convertToAdmin(id),
    select: ({ data }) => data,
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
        error: query.error,
        messagesStatusError: {
          unauthorized: 'No tienes permisos para convertir a administrador',
        },
      });
    }
  }, [query.isError]);

  return query;
}
