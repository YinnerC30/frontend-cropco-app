import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Client } from '../../interfaces/Client';

export const getClientById = async (id: string): Promise<Client> => {
  const { data } = await cropcoAPI.get(`${pathsCropco.clients}/one/${id}`);
  return data;
};

export const useGetClient = (
  id: string
): UseQueryResult<Client, AxiosError> => {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('clients', 'find_one_client');

  const query: UseQueryResult<Client, AxiosError> = useQuery({
    queryKey: ['client', id],
    queryFn: () => getClientById(id),
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso de lectura para obtener la información del cliente solicitado'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messagesStatusError: {},
      });
    }
  }, [query.isError, query.error]);
  return query;
};
