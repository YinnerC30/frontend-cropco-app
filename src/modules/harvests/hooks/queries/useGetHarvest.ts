import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ConvertStringToDate } from '@/modules/core/helpers';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responsess/UseGetOneRecordReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Harvest } from '../../interfaces';

export const getHarvestById = async (
  id: string
): PromiseReturnRecord<Harvest> => {
  return await cropcoAPI.get(`${pathsCropco.harvests}/one/${id}`);
};

export const useGetHarvest = (id: string): UseGetOneRecordReturn<Harvest> => {
  const { handleError, hasPermission } = useAuthContext();
  const isAuthorized = hasPermission('harvests', 'find_one_harvest');
  const query: UseGetOneRecordReturn<Harvest> = useQuery({
    queryKey: ['harvest', id],
    queryFn: () => getHarvestById(id),
    staleTime: 60_000 * 60,
    select: ({ data }) => {
      return {
        ...data,
        date: ConvertStringToDate(data.date),
      } as unknown as Harvest;
    },
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso de lectura para obtener la información del cultivo solicitado'
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
