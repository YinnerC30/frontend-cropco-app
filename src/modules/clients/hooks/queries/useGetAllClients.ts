import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { usePaginationDataTable } from '@/modules/core/hooks';
import {
  BasicQueryData,
  PropsUseGetAllRecords,
  ResponseApiGetAllRecords,
} from '@/modules/core/interfaces';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Client } from '../../interfaces/Client';
import { CACHE_CONFIG_TIME } from '@/config';

export const getClients = async (
  values: BasicQueryData
): TypeGetAllRecordsReturn<Client> => {
  const { query = '', limit = 10, offset = 0, allRecords = false } = values;
  const params = new URLSearchParams({
    query,
    limit: limit.toString(),
    offset: offset.toString(),
    allRecords: allRecords.toString(),
  });
  const { data } = await cropcoAPI.get(`${pathsCropco.clients}/all?${params}`);
  return data;
};

export const useGetAllClients = ({
  queryValue,
  allRecords = false,
}: PropsUseGetAllRecords): UseGetAllRecordsReturn<Client> => {
  const { pagination, setPagination } = usePaginationDataTable();

  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('clients', 'find_all_clients');
  const query: UseQueryResult<
    ResponseApiGetAllRecords<Client>,
    AxiosError
  > = useQuery({
    queryKey: ['clients', { queryValue, ...pagination }],
    queryFn: () =>
      getClients({
        query: queryValue,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
    staleTime: CACHE_CONFIG_TIME.mediumTerm.staleTime,
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error('No tienes permiso para ver el listado de clientes 😑');
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messagesStatusError: {},
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};
