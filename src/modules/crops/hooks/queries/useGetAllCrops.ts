import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { usePaginationDataTable } from '@/modules/core/hooks';
import {
  BasicQueryData,
  UseGetAllRecordsProps
} from '@/modules/core/interfaces';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Crop } from '../../interfaces/Crop';
import { CACHE_CONFIG_TIME } from '@/config';

export const getCrops = async (
  values: BasicQueryData
): TypeGetAllRecordsReturn<Crop> => {
  const { query = '', limit, offset, all_records = false } = values;
  const params = new URLSearchParams({
    query,
    limit: limit.toString(),
    offset: offset.toString(),
    all_records: all_records.toString(),
  });
  return await cropcoAPI.get(`${pathsCropco.crops}/all?${params}`);
};

export const useGetAllCrops = ({
  queryValue,
  all_records,
  canExecuteQuery = true,
}: UseGetAllRecordsProps): UseGetAllRecordsReturn<Crop> => {
  const { pagination, setPagination } = usePaginationDataTable();
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission('crops', 'find_all_crops');

  const query: UseQueryGetAllRecordsReturn<Crop> = useQuery({
    queryKey: ['crops', { queryValue, ...pagination }],
    queryFn: () =>
      getCrops({
        query: queryValue,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        all_records,
      }),
    select: ({ data }) => data,
    enabled: isAuthorized && canExecuteQuery,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.mediumTerm,
    
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error('No tienes permiso para ver el listado de cultivos 😑');
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

  return { query, pagination, setPagination };
};
