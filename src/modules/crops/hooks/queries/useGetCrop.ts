import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import {
  useAuthorization,
  useManageErrorApp,
} from '@/modules/authentication/hooks';

export const getCropById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.crops}/one/${id}`);
  return data;
};

export const useGetCrop = (id: string) => {
  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthorization();
  const query = useQuery({
    queryKey: ['crop', id],
    queryFn: () => getCropById(id),
    enabled: hasPermission('crops', 'find_one_crop'),
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para obtener la información del cultivo 😑',
      });
    }
  }, [query.isError, query.error]);
  return query;
};