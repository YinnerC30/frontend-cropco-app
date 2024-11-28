import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import {
  useAuthenticationContext,
  useManageErrorApp,
} from '@/modules/authentication/hooks';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const getClientById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.clients}/one/${id}`);
  return data;
};

export const useGetClient = (id: string) => {
  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthenticationContext();

  const isAuthorized = hasPermission('clients', 'find_one_client');

  const query = useQuery({
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
        messageUnauthoraizedError:
          'No tienes permiso para ver la información del cliente 😑',
      });
    }
  }, [query.isError, query.error]);
  return query;
};
