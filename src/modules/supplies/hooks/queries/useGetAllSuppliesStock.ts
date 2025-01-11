import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';



import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import {
  BasicQueryData,
  ResponseApiGetAllRecords,
  UseGetAllRecordsProps,
} from '@/modules/core/interfaces';

import { useAuthContext } from '@/auth/hooks';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { toast } from 'sonner';
import { SupplyStock } from '../../interfaces/SupplyStock';

// FIX: Eliminar propiedades no utilizadas

export const getAllSuppliesStock = async ({
  query = '',
  limit = 10,
  offset = 0,
  allRecords = false,
}: BasicQueryData): TypeGetAllRecordsReturn<SupplyStock> => {
  const params = new URLSearchParams({
    query,
    limit: limit.toString(),
    offset: offset.toString(),
    allRecords: allRecords.toString(),
  });

  return await cropcoAPI.get(`${pathsCropco.supplies}/stock/all?${params}`);
};

export const useGetAllSuppliesStock = ({
  queryValue,
  allRecords,
}: UseGetAllRecordsProps): UseGetOneRecordReturn<
  ResponseApiGetAllRecords<SupplyStock>
> => {
  const { handleError, hasPermission } = useAuthContext();

  const isAuthorized = hasPermission('supplies', 'find_all_supplies_stock');

  const query: UseGetOneRecordReturn<ResponseApiGetAllRecords<SupplyStock>> =
    useQuery({
      queryKey: ['supplies-stock', { queryValue }],
      queryFn: () =>
        getAllSuppliesStock({
          query: queryValue,
          limit: 10,
          offset: 0,
          allRecords,
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
