import { useQuery } from '@tanstack/react-query';

import { UseGetAllRecordsProps } from '@/modules/core/interfaces/propss/PropsUseGetAllRecords';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { CACHE_CONFIG_TIME } from '@/config';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { BasicQueryData } from '@/modules/core/interfaces';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { Employee } from '../../interfaces/Employee';

export const getEmployees = async (
  values: BasicQueryData
): TypeGetAllRecordsReturn<Employee> => {
  const { query = '', limit = 10, offset = 0, allRecords = false } = values;
  const params = new URLSearchParams({
    query,
    limit: limit.toString(),
    offset: offset.toString(),
    allRecords: allRecords.toString(),
  });

  return await cropcoAPI.get(`${pathsCropco.employees}/all?${params}`);
};

export const useGetAllEmployees = ({
  queryValue,
  allRecords = false,
}: UseGetAllRecordsProps): UseGetAllRecordsReturn<Employee> => {
  const { pagination, setPagination } = usePaginationDataTable();

  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('employees', 'find_all_employees');

  const query: UseQueryGetAllRecordsReturn<Employee> = useQuery({
    queryKey: ['employees', { queryValue, ...pagination }],
    queryFn: () =>
      getEmployees({
        query: queryValue,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
    select: ({ data }) => data,
    staleTime: CACHE_CONFIG_TIME.mediumTerm.staleTime,
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error('No tienes permiso para ver el listado de usuarios 😑');
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {
          unauthorized: 'No tienes permiso para ver el listado de empleados 😑',
        },
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};
