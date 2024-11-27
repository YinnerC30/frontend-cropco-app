import { useQuery } from '@tanstack/react-query';

import { PropsUseGetAllRecords } from '@/modules/core/interfaces/props/PropsUseGetAllRecords';

import { PaginationState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import {
  useAuthorization,
  useManageErrorApp,
} from '@/modules/authentication/hooks';
import { ResponseUseGetAllRecords } from '@/modules/core/interfaces';
import { ResponseApiGetAllRecords } from '@/modules/core/interfaces/responses/ResponseApiGetAllRecords';
import { AxiosError } from 'axios';
import { Employee } from '../../interfaces/Employee';

interface Props {
  search: string;
  limit: number;
  offset: number;
  allRecords?: boolean;
}

export const getEmployees = async ({
  search = '',
  limit = 10,
  offset = 0,
  allRecords = false,
}: Props): Promise<ResponseApiGetAllRecords<Employee>> => {
  let params = new URLSearchParams();
  params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());
  params.append('allRecords', allRecords.toString());

  const { data } = await cropcoAPI.get(
    `${pathsCropco.employees}/all?${params}`
  );
  return data;
};

export const useGetAllEmployees = ({
  searchParameter,
  allRecords,
}: PropsUseGetAllRecords): ResponseUseGetAllRecords<Employee> => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { hasPermission } = useAuthorization();
  const { handleError } = useManageErrorApp();

  const query = useQuery({
    queryKey: ['employees', { searchParameter, ...pagination }],
    queryFn: () =>
      getEmployees({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
    enabled: hasPermission('employees', 'find_all_employees'),
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para ver el listado de usuarios 😑',
      });
    }
  }, [query.isError, query.error]);

  return { query, pagination, setPagination };
};
