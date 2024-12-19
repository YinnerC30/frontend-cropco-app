import { useAuthContext } from '@/auth/hooks';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { User } from '../../interfaces';

async function getUserById(id: string): Promise<User> {
  const { data } = await cropcoAPI.get(`${pathsCropco.users}/one/${id}`);
  return data;
}

export function useGetUser(id: string): UseQueryResult<User, Error> {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('users', 'find_one_user');

  const query = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso de lectura para obtener la información del usuario solicitado'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messagesStatusError: {
          notFound: 'El usuario solicitado no fue encontrado',
          badRequest: 'La solicitud al usuario es incorrecta',
          unauthorized:
            'No tienes permiso para obtener la información del usuario',
        },
      });
    }
  }, [query.isError]);

  return query;
}
