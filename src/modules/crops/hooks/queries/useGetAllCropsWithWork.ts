import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { Crop } from '../../interfaces/Crop';

export const getCropsWithWork = async (): TypeGetAllRecordsReturn<Crop> => {
  return await cropcoAPI.get(`${pathsCropco.crops}/with-work/all`);
};

export const useGetAllCropsWithWork = (): UseQueryGetAllRecordsReturn<Crop> => {
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission('crops', 'find_all_crops_with_work');
  const query: UseQueryGetAllRecordsReturn<Crop> = useQuery({
    queryKey: ['crops-with-work'],
    queryFn: () => getCropsWithWork(),
    select: ({ data }) => data,
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'No tienes permiso para ver el listado de cultivos con trabajos 😑'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {},
      });
    }
  }, [query.isError, query.error]);

  return query;
};
