import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { CACHE_CONFIG_TIME } from '@/config';
import { usePaginationDataTable } from '@/modules/core/hooks';
import {
  BasicQueryData,
  UseGetAllRecordsProps,
} from '@/modules/core/interfaces';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Tenant } from '../../interfaces/Tenant';

export const getTenants = async (
  values: BasicQueryData
): TypeGetAllRecordsReturn<Tenant> => {
  const { query = '', limit, offset, all_records = false } = values;
  const params = new URLSearchParams({
    query,
    limit: limit.toString(),
    offset: offset.toString(),
    all_records: all_records.toString(),
  });
  return await cropcoAPI.get(`${pathsCropco.tenants}/all?${params}`);
};

export const useGetAllTenants = ({
  queryValue,
  all_records,
  canExecuteQuery = true,
}: UseGetAllRecordsProps): UseGetAllRecordsReturn<Tenant> => {
  const { pagination, setPagination } = usePaginationDataTable();
  // const { hasPermission, handleError } = useAuthContext();
  // const isAuthorized = hasPermission('tenants', 'find_all_tenants');

  const query: UseQueryGetAllRecordsReturn<Tenant> = useQuery({
    queryKey: ['tenants', { queryValue, ...pagination }],
    queryFn: () =>
      getTenants({
        query: queryValue,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        all_records,
      }),
    select: ({ data }) => data,
    enabled: true,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.mediumTerm,
  });

  // useEffect(() => {
  //   if (!isAuthorized) {
  //     toast.error('No tienes permiso para ver el listado de inquilinos 😑');
  //   }
  // }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      // handleError({
      //   error: query.error,
      //   messagesStatusError: {},
      // });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};
