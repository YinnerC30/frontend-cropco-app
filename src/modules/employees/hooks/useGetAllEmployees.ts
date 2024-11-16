import { useQuery } from '@tanstack/react-query';

import { PropsUseGetAllRecords } from '@/modules/core/interfaces/Props/PropsUseGetAllRecords';
import { ResponseUseGetAllRecords } from '@/modules/core/interfaces/ResponseUseGetAllRecords';
import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { Employee } from '../interfaces/Employee';
import { getEmployees } from '../services/getEmployees';

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
