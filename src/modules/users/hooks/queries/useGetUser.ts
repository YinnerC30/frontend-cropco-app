import { useAuthContext } from '@/auth/hooks';
import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { Action, Module } from '@/modules/core/interfaces';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { User } from '../../interfaces';

async function getUserById(id: string): PromiseReturnRecord<User> {
  return await cropcoAPI.get(`${pathsCropco.users}/one/${id}`);
}

export function useGetUser(id: string): UseGetOneRecordReturn<User> {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('users', 'find_one_user');

  const query: UseGetOneRecordReturn<User> = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: isAuthorized,
    select: ({ data }) => ({
      ...data,
      actions: data?.modules?.flatMap((module: Module) =>
        module.actions.map((action: Action) => ({ id: action.id }))
      ),
    }),
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
        error: query.error,
        messagesStatusError: {
          notFound: 'El usuario solicitado no fue encontrado',
          unauthorized:
            'No tienes permiso para obtener la información del usuario',
        },
      });
    }
  }, [query.isError]);

  return query;
}
