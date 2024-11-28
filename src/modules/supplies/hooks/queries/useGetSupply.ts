import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

import {
  useAuthContext,
  useManageErrorApp,
} from '@/modules/authentication/hooks';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Supply } from '../../interfaces/Supply';
import { toast } from 'sonner';

export const getSupplyById = async (id: string): Promise<Supply> => {
  const { data } = await cropcoAPI.get(`${pathsCropco.supplies}/one/${id}`);
  return data;
};

export const useGetSupply = (id: string): UseQueryResult<Supply, Error> => {
  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthContext();
  const isAuthorized = hasPermission('supplies', 'find_one_supply');

  const query = useQuery({
    queryKey: ['supply', id],
    queryFn: () => getSupplyById(id),
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso de lectura para obtener la información del suministro solicitado'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para ver la información del suministro 😑',
      });
    }
  }, [query.isError, query.error]);
  return query;
};
