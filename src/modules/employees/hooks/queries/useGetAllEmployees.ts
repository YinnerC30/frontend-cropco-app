import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseGetAllRecordsProps } from '@/modules/core/interfaces/props/PropsUseGetAllRecords';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { BasicQueryData } from '@/modules/core/interfaces';
import { ResponseApiGetAllRecords } from '@/modules/core/interfaces/responses/ResponseApiGetAllRecords';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Employee } from '../../interfaces/Employee';
import { CACHE_CONFIG_TIME } from '@/config';

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

  const { data } = await cropcoAPI.get(
    `${pathsCropco.employees}/all?${params}`
  );
  return data;
};

export const useGetAllEmployees = ({
  queryValue,
  allRecords = false,
}: UseGetAllRecordsProps): UseGetAllRecordsReturn<Employee> => {
  const { pagination, setPagination } = usePaginationDataTable();

  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('employees', 'find_all_employees');

  const query: UseQueryResult<
    ResponseApiGetAllRecords<Employee>,
    AxiosError
  > = useQuery({
    queryKey: ['employees', { queryValue, ...pagination }],
    queryFn: () =>
      getEmployees({
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
      toast.error('No tienes permiso para ver el listado de usuarios 😑');
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messagesStatusError: {
          unauthorized: 'No tienes permiso para ver el listado de empleados 😑',
        },
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};
