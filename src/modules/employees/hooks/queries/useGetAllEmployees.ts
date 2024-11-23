import { useQuery } from '@tanstack/react-query';

import { PropsUseGetAllRecords } from '@/modules/core/interfaces/Props/PropsUseGetAllRecords';

import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { Employee } from '../interfaces/Employee';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { ResponseApiGetAllRecords } from '@/modules/core/interfaces/Responses/ResponseApiGetAllRecords';
import { ResponseUseGetAllRecords } from '@/modules/core/interfaces';

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

  const query = useQuery({
    queryKey: ['employees', { searchParameter, ...pagination }],
    queryFn: () =>
      getEmployees({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
  });

  return { query, pagination, setPagination };
};
