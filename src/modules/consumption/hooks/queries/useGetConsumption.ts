import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useQuery } from '@tanstack/react-query';
import { ConsumptionSupplies } from '../../interfaces';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthContext } from '@/auth';
import { ConvertStringToDate } from '@/modules/core/helpers';

export const getConsumptionById = async (
  id: string
): PromiseReturnRecord<ConsumptionSupplies> => {
  return await cropcoAPI.get(`${pathsCropco.consumption}/one/${id}`);
};

export const useGetConsumption = (
  id: string
): UseGetOneRecordReturn<ConsumptionSupplies> => {
  const { handleError, hasPermission } = useAuthContext();
  const isAuthorized = hasPermission(
    'supplies',
    'find_one_supplies_consumption'
  );

  const query: UseGetOneRecordReturn<ConsumptionSupplies> = useQuery({
    queryKey: ['consumptions', id],
    queryFn: () => getConsumptionById(id),
    select: ({ data }) =>
      ({
        ...data,
        date: ConvertStringToDate(data?.date),
      } as unknown as ConsumptionSupplies),
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso de lectura para obtener la información del consumo solicitado'
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
