import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { usePaginationDataTable } from '@/modules/core/hooks';
import {
  BasicQueryData,
  UseGetAllRecordsProps,
} from '@/modules/core/interfaces';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { Supplier } from '../../interfaces/Supplier';
import { CACHE_CONFIG_TIME } from '@/config';

export const getSuppliers = async ({
  query = '',
  limit = 10,
  offset = 0,
}: BasicQueryData): TypeGetAllRecordsReturn<Supplier> => {
  const params = new URLSearchParams({
    query,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  return await cropcoAPI.get(`${pathsCropco.suppliers}/all?${params}`);
};

export const useGetAllSuppliers = ({
  queryValue,
}: UseGetAllRecordsProps): UseGetAllRecordsReturn<Supplier> => {
  const { pagination, setPagination } = usePaginationDataTable();
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('suppliers', 'find_all_suppliers');

  const query: UseQueryGetAllRecordsReturn<Supplier> = useQuery({
    queryKey: ['suppliers', { queryValue, ...pagination }],
    queryFn: () =>
      getSuppliers({
        query: queryValue,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
    select: ({ data }) => {
      return {
        ...data,
        records: data.records.map((supl) => {
          return {
            ...supl,
            full_name: supl.first_name + ' ' + supl.last_name,
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
      toast.error('No tienes permiso para ver el listado de proveedores 😑');
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
