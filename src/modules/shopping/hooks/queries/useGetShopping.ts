import { useQuery } from '@tanstack/react-query';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ShoppingSupplies } from '../../interfaces';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';
import { useAuthContext } from '@/auth';
import { toast } from 'sonner';
import { ConvertStringToDate } from '@/modules/core/helpers';
import { CACHE_CONFIG_TIME } from '@/config';

export const getShoppingById = async (
  id: string
): PromiseReturnRecord<ShoppingSupplies> => {
  return await cropcoAPI.get(`${pathsCropco.shopping}/one/${id}`);
};

export const useGetShopping = (
  id: string
): UseGetOneRecordReturn<ShoppingSupplies> => {
  const { handleError, hasPermission } = useAuthContext();
  const isAuthorized = hasPermission('shopping', 'find_one_supplies_shopping');
  const query: UseGetOneRecordReturn<ShoppingSupplies> = useQuery({
    queryKey: ['shopping', id],
    queryFn: () => getShoppingById(id),
    select: ({ data }) =>
      ({
        ...data,
        date: ConvertStringToDate(data?.date!),
        details: data.details.map((de) => {
          return {
            ...de,
            supplier: {
              ...de.supplier,
              full_name: de.supplier.first_name + ' ' + de.supplier.last_name,
            },
          };
        }),
      } as unknown as ShoppingSupplies),
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.shortTerm,
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
