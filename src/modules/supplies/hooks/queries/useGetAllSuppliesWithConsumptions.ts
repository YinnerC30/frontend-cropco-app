import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

import { useAuthContext } from '@/auth/hooks';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { Supply } from '../../interfaces/Supply';
import { CACHE_CONFIG_TIME } from '@/config';

export const getSuppliesWithConsumptions =
  async (): TypeGetAllRecordsReturn<Supply> => {
    return await cropcoAPI.get(`${pathsCropco.supplies}/consumptions/all`);
  };

export const useGetAllSuppliesWithConsumptions =
  (): UseQueryGetAllRecordsReturn<Supply> => {
    const { hasPermission, handleError } = useAuthContext();

    const isAuthorized = hasPermission(
      'supplies',
      'find_all_supplies_with_consumptions'
    );

    const query: UseQueryGetAllRecordsReturn<Supply> = useQuery({
      queryKey: ['supplies-with-consumptions'],
      queryFn: () => getSuppliesWithConsumptions(),
      select: ({ data }) => data,
      enabled: isAuthorized,
      refetchOnWindowFocus: false,
      ...CACHE_CONFIG_TIME.longTerm,
    });

    useEffect(() => {
      if (!isAuthorized) {
        toast.error(
          'No tienes permiso para ver el listado de insumos con consumos '
        );
      }
    }, [isAuthorized]);

    useEffect(() => {
      if (query.isError) {
        handleError({
          error: query.error,
          handlers: {},
        });
      }
    }, [query.isError, query.error]);

    return query;
  };
