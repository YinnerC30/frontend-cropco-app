import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { useQuery } from '@tanstack/react-query';

export const getPayments = async ({
  limit = 10,
  offset = 0,
  employee = '',
  filter_by_date = false,
  type_filter_date = '',
  date = '',

  filter_by_total = false,
  type_filter_total = '',
  total = 0,

  filter_by_method_of_payment,
  method_of_payment = '',
}: any) => {
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());
  params.append('employee', employee.toString());

  if (filter_by_date) {
    params.append('filter_by_date', 'true');
    params.append('type_filter_date', type_filter_date);
    params.append('date', new Date(date).toISOString());
  }

  if (filter_by_total) {
    params.append('filter_by_total', 'true');
    params.append('type_filter_total', type_filter_total);
    params.append('total', total.toString());
  }
  if (filter_by_method_of_payment) {
    params.append('filter_by_method_of_payment', 'true');
    params.append('method_of_payment', method_of_payment.toString());
  }

  const { data } = await cropcoAPI.get(`${pathsCropco.payments}/all?${params}`);
  return data;
};

export const useGetAllPayments = ({
  employee,
  filter_by_date,
  type_filter_date,
  date,
  filter_by_total,
  type_filter_total,
  total,
  filter_by_method_of_payment = false,
  method_of_payment = '',
}: any) => {
  const { pagination, setPagination, pageIndex, pageSize } =
    usePaginationDataTable();

  const query = useQuery({
    queryKey: [
      'payments',
      {
        employee,
        filter_by_date,
        type_filter_date,
        date,
        filter_by_total,
        type_filter_total,
        total,
        filter_by_method_of_payment,
        method_of_payment,
        ...pagination,
      },
    ],
    queryFn: () =>
      getPayments({
        limit: pageSize,
        offset: pageIndex,
        employee,
        filter_by_date,
        type_filter_date,
        date,
        filter_by_total,
        type_filter_total,
        total,
        filter_by_method_of_payment,
        method_of_payment,
      }),
  });

  return { query, pagination, setPagination };
};
