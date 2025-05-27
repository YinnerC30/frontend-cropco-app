import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { Crop } from '../../interfaces/Crop';
import { CACHE_CONFIG_TIME } from '@/config';

export const getCropsWithConsumptions =
  async (): TypeGetAllRecordsReturn<Crop> => {
    return await cropcoAPI.get(`${pathsCropco.crops}/with-consumptions/all`);
  };

export const useGetAllCropsWithConsumptions =
  (): UseQueryGetAllRecordsReturn<Crop> => {
    const { hasPermission, handleError } = useAuthContext();
    const isAuthorized = hasPermission(
      'crops',
      'find_all_crops_with_consumptions'
    );
    const query: UseQueryGetAllRecordsReturn<Crop> = useQuery({
      queryKey: ['crops-with-consumptions'],
      queryFn: () => getCropsWithConsumptions(),
      select: ({ data }) => data,
      enabled: isAuthorized,
      refetchOnWindowFocus: false,
      ...CACHE_CONFIG_TIME.longTerm,
    });

    useEffect(() => {
      if (!isAuthorized) {
        toast.error(
          'No tienes permiso para ver el listado de cultivos con consumos 😑'
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
