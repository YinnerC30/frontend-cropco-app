import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import {
  useAuthorization,
  useManageErrorApp,
} from '@/modules/authentication/hooks';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export const getClientById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.clients}/one/${id}`);
  return data;
};
export const useGetClient = (id: string) => {
  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthorization();
  const query = useQuery({
    queryKey: ['client', id],
    queryFn: () => getClientById(id),
    enabled: hasPermission('clients', 'find_one_client'),
  });

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
