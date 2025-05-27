import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ConvertStringToDate } from '@/modules/core/helpers';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Sale } from '../../interfaces';
import { CACHE_CONFIG_TIME } from '@/config';

export const getSaleById = async (id: string): PromiseReturnRecord<Sale> => {
  return await cropcoAPI.get(`${pathsCropco.sales}/one/${id}`);
};

export const useGetSale = (id: string): UseGetOneRecordReturn<Sale> => {
  const { handleError, hasPermission } = useAuthContext();

  const isAuthorized = hasPermission('sales', 'find_one_sale');

  const query: UseGetOneRecordReturn<Sale> = useQuery({
    queryKey: ['sale', id],
    queryFn: () => getSaleById(id),
    select: ({ data }) => ({...data, date: ConvertStringToDate(data?.date),} as unknown as Sale),
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.shortTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso de lectura para obtener la información de la venta solicitada'
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
