import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { BasicQueryData } from '@/modules/core/interfaces';
import { UseGetAllRecordsProps } from '@/modules/core/interfaces/props/PropsUseGetAllRecords';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { Client } from '../../interfaces/Client';
import { CACHE_CONFIG_TIME } from '@/config/constants';

export const getClients = async (
  values: BasicQueryData
): TypeGetAllRecordsReturn<Client> => {
  const { query = '', limit = 10, offset = 0, all_records = false } = values;
  const params = new URLSearchParams({
    query,
    limit: limit.toString(),
    offset: offset.toString(),
    all_records: all_records.toString(),
  });
  return await cropcoAPI.get(`${pathsCropco.clients}/all?${params}`);
};

export const useGetAllClients = ({
  queryValue,
  all_records = false,
}: UseGetAllRecordsProps): UseGetAllRecordsReturn<Client> => {
  const { pagination, setPagination } = usePaginationDataTable();

  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('clients', 'find_all_clients');
  const query: UseQueryGetAllRecordsReturn<Client> = useQuery({
    queryKey: ['clients', { queryValue, ...pagination }],
    queryFn: () =>
      getClients({
        query: queryValue,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        all_records,
      }),
      select: ({ data }) => {
        return {
          ...data,
          records: data.records.map((cl) => {
            return {
              ...cl,
              full_name: cl.first_name + ' ' + cl.last_name,
            };
          }),
        };
      },
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.mediumTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error('No tienes permiso para ver el listado de clientes 😑');
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

  return { query, pagination, setPagination };
};
