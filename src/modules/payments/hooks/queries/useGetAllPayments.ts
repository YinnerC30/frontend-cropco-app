import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getPayments = async ({
  search = '',
  limit = 10,
  offset = 0,
  employee = '',
  after_date = '',
  before_date = '',
  filter_by_method_of_payment,
  method_of_payment = '',
  minor_total = 0,
  major_total = 0,
}: any) => {
  const params = new URLSearchParams();
  params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  params.append('employee', employee.toString());

  if (after_date.length > 0) {
    params.append('after_date', new Date(after_date).toISOString());
  }
  if (before_date.length > 0) {
    params.append('before_date', new Date(before_date).toISOString());
  }
  if (minor_total != 0) {
    params.append('minor_total', minor_total.toString());
  }
  if (filter_by_method_of_payment) {
    params.append('filter_by_method_of_payment', 'true');
    params.append('method_of_payment', method_of_payment.toString());
  }
  if (major_total != 0) {
    params.append('major_total', major_total.toString());
  }

  const { data } = await cropcoAPI.get(`${pathsCropco.payments}/all?${params}`);
  return data;
};

export const useGetAllPayments = ({
  searchParameter = '',
  employee = '',
  after_date = '',
  before_date = '',
  filter_by_method_of_payment = false,
  method_of_payment = '',
  minor_total = 0,
  major_total = 0,
}: any) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: [
      'payments',
      {
        searchParameter,
        employee,
        after_date,
        before_date,
        filter_by_method_of_payment,
        method_of_payment,
        minor_total,
        major_total,
        ...pagination,
      },
    ],
    queryFn: () =>
      getPayments({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        employee,
        after_date,
        before_date,
        filter_by_method_of_payment,
        method_of_payment,
        minor_total,
        major_total,
      }),
  });

  return { query, pagination, setPagination };
};
