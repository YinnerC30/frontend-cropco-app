import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';



import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import {
  BasicQueryData,
  ResponseApiGetAllRecords,
  
} from '@/modules/core/interfaces';

import { useAuthContext } from '@/auth/hooks';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { toast } from 'sonner';
import { SupplyStock } from '../../interfaces/SupplyStock';
import { UseGetAllRecordsProps } from '@/modules/core/interfaces/props/PropsUseGetAllRecords';

// FIX: Eliminar propiedades no utilizadas

export const getAllSuppliesStock = async ({
  query = '',
  limit = 10,
  offset = 0,
  all_records = false,
}: BasicQueryData): TypeGetAllRecordsReturn<SupplyStock> => {
  const params = new URLSearchParams({
    query,
    limit: limit.toString(),
    offset: offset.toString(),
    all_records: all_records.toString(),
  });

  return await cropcoAPI.get(`${pathsCropco.supplies}/stock/all?${params}`);
};

export const useGetAllSuppliesStock = ({
  queryValue,
  all_records,
}: UseGetAllRecordsProps): UseGetOneRecordReturn<
  ResponseApiGetAllRecords<SupplyStock>
> => {
  const { handleError, hasPermission } = useAuthContext();

  const isAuthorized = hasPermission('supplies', 'find_all_supplies_with_stock');

  const query: UseGetOneRecordReturn<ResponseApiGetAllRecords<SupplyStock>> =
    useQuery({
      queryKey: ['supplies-with-stock', { queryValue }],
      queryFn: () =>
        getAllSuppliesStock({
          query: queryValue,
          limit: 10,
          offset: 0,
          all_records,
        }),
      select: ({ data }) => data,
      enabled: isAuthorized,
    });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'No tienes permiso para ver el listado de suministros con stock 😑'
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
