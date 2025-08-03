import { useQuery } from '@tanstack/react-query';

import { UseGetAllRecordsProps } from '@/modules/core/interfaces/props/PropsUseGetAllRecords';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { BasicQueryData } from '@/modules/core/interfaces';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { Employee } from '../../interfaces/Employee';
import { CACHE_CONFIG_TIME } from '@/config';

export const getEmployees = async (
  values: BasicQueryData
): TypeGetAllRecordsReturn<Employee> => {
  const { query = '', limit = 10, offset = 0, all_records = false } = values;
  const params = new URLSearchParams({
    query,
    limit: limit.toString(),
    offset: offset.toString(),
    all_records: all_records.toString(),
  });

  return await cropcoAPI.get(`${pathsCropco.employees}/all?${params}`);
};

export const useGetAllEmployees = ({
  queryValue,
  all_records = false,
}: UseGetAllRecordsProps): UseGetAllRecordsReturn<Employee> => {
  const { pagination, setPagination } = usePaginationDataTable();

  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('employees', 'find_all_employees');

  const query: UseQueryGetAllRecordsReturn<Employee> = useQuery({
    queryKey: ['employees', { queryValue, all_records, ...pagination }],
    queryFn: () =>
      getEmployees({
        query: queryValue,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        all_records,
      }),
    select: ({ data }) => {
      return {
        ...data,
        records: data.records.map((em) => {
          return {
            ...em,
            full_name: em.first_name + ' ' + em.last_name,
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
      toast.error('No tienes permiso para ver el listado de usuarios ');
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
