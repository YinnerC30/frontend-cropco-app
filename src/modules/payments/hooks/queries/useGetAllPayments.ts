import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { usePaginationDataTable } from '@/modules/core/hooks';
import { QueryDateProps } from '@/modules/core/interfaces/queries/QueryDateProps';
import { QueryPaginationProps } from '@/modules/core/interfaces/queries/QueryPaginationProps';
import { QueryValuePayProps } from '@/modules/core/interfaces/queries/QueryValuePayProps';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { MethodOfPayment } from '../../interfaces/MethodOfPayment';
import { Payment } from '../../interfaces/Payment';
import { CACHE_CONFIG_TIME } from '@/config';

export interface GetPaymentsProps
  extends QueryPaginationProps,
    QueryDateProps,
    QueryValuePayProps {
  employee?: string;
  filter_by_method_of_payment?: boolean;
  method_of_payment?: MethodOfPayment;
}

export const getPayments = async (
  props: GetPaymentsProps
): TypeGetAllRecordsReturn<Payment> => {
  const params = new URLSearchParams();
  params.append('limit', props.limit?.toString() ?? '10');
  params.append('offset', props.offset?.toString() ?? '0');
  params.append('employee', props.employee?.toString() ?? '');

  if (props.filter_by_date) {
    params.append('filter_by_date', 'true');
    params.append('type_filter_date', props.type_filter_date || '');
    params.append('date', new Date(props.date || '').toISOString());
  }

  if (props.filter_by_value_pay) {
    params.append('filter_by_value_pay', 'true');
    params.append('type_filter_value_pay', props.type_filter_value_pay || '');
    params.append('value_pay', props.value_pay?.toString() || '0');
  }
  if (props.filter_by_method_of_payment) {
    params.append('filter_by_method_of_payment', 'true');
    params.append(
      'method_of_payment',
      props.method_of_payment?.toString() ?? ''
    );
  }

  return await cropcoAPI.get(`${pathsCropco.payments}/all?${params}`);
};

export const useGetAllPayments = (
  props: GetPaymentsProps
): UseGetAllRecordsReturn<Payment> => {
  const { pagination, setPagination } = usePaginationDataTable();

  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('payments', 'find_all_payments');

  const query: UseQueryGetAllRecordsReturn<Payment> = useQuery({
    queryKey: [
      'payments',
      {
        ...props,
        ...pagination,
      },
    ],
    queryFn: () =>
      getPayments({
        ...props,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
    select: ({ data }) => {
      return {
        ...data,
        records: data.records.map((re) => {
          return {
            ...re,
            employee: {
              ...re.employee,
              full_name: re.employee.first_name + ' ' + re.employee.last_name,
            },
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
      toast.error(
        'Requieres del permiso de lectura para obtener la información del usuario solicitado'
      );
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
