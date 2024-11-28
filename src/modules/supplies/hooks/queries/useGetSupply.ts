import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Supply } from '../interfaces/Supply';
import { useManageErrorApp } from '@/modules/authentication/hooks';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export const getSupplyById = async (id: string): Promise<Supply> => {
  const { data } = await cropcoAPI.get(`${pathsCropco.supplies}/one/${id}`);
  return data;
};

export const useGetSupply = (id: string): UseQueryResult<Supply, Error> => {
  const { handleError } = useManageErrorApp();
  const query = useQuery({
    queryKey: ['supply', id],
    queryFn: () => getSupplyById(id),
  });

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
