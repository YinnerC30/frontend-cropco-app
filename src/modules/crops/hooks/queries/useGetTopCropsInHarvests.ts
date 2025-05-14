import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';

interface CropTopHarvest {
  id: string;
  name: string;
  total_harvests: number;
  total_stock: number;
}

export const getTopCropsInHarvests = async ({
  year,
}: {
  year: number;
}): TypeGetAllRecordsReturn<CropTopHarvest> => {
  const params = new URLSearchParams({
    year: year.toString(),
  });
  return await cropcoAPI.get(
    `${pathsCropco.dashboard}/find/count-harvest-and-total-stock?${params}`
  );
};

export const useGetTopCropsInHarvests = ({
  year = new Date().getFullYear(),
}: {
  year?: number;
}): UseQueryGetAllRecordsReturn<CropTopHarvest> => {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission(
    'dashboard',
    'find_count_harvests_and_total_stock_chart'
  );

  const query: UseQueryGetAllRecordsReturn<CropTopHarvest> = useQuery({
    queryKey: ['crops-top-harvests', year],
    queryFn: () => getTopCropsInHarvests({ year }),
    select: ({ data }) => data,
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'No tienes permiso para ver el listado del top cultivos en cosechas 😑'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {
          unauthorized:
            'No tienes permiso para ver el listado del top cultivos en cosechas 😑',
        },
      });
    }
  }, [query.isError, query.error]);

  return query;
};
