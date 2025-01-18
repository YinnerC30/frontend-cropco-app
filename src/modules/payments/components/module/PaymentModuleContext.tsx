import { useAuthContext } from '@/auth';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useAdvancedQueryData } from '@/modules/core/hooks/useAdvancedQueryData';
import { createContext, useMemo } from 'react';

import { BulkRecords } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useDeleteBulkPayments } from '../../hooks/mutations/useDeleteBulkPayments';
import { useDeletePayment } from '../../hooks/mutations/useDeletePayment';
import { useGetAllPayments } from '../../hooks/queries/useGetAllPayments';
import { Payment } from '../../interfaces/Payment';
import { ActionsTablePayment } from './ActionsTablePayment';
import columnsPayment from './ColumnsTablePayment';

export interface paramQueryPayment {
  employee: { id: string | null | undefined };
  filter_by_date: {
    type_filter_date: string | null | undefined;
    date: string | null | undefined | Date | unknown;
  };
  filter_by_total: {
    type_filter_total: string | null | undefined;
    total: string | null | undefined | unknown;
  };
  // TODO: Pendiente Method of Payment
  //
}

export interface PaymentsModuleContextValues {
  paramsQuery: paramQueryPayment;
  queryPayments: UseQueryGetAllRecordsReturn<Payment>;
  dataTable: DataTableManualReturn<Payment>;
  mutationDeletePayments: UseMutationReturn<void, BulkRecords>;
  mutationDeletePayment: UseMutationReturn<void, string>;
  actionsPaymentsModule: Record<string, boolean>;
}

export const PaymentsModuleContext = createContext<
  PaymentsModuleContextValues | undefined
>(undefined);

export const PaymentsModuleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { paramsValues } = useAdvancedQueryData({
    params: [
      'employee',
      'filter_by_date',
      'type_filter_date',
      'date',

      'filter_by_total',
      'type_filter_total',
      'total',
    ],
  });

  const {
    query: queryPayments,
    pagination,
    setPagination,
  } = useGetAllPayments({
    ...paramsValues,
  });

  const { getActionsModule } = useAuthContext();

  const actionsPaymentsModule = useMemo(() => getActionsModule('payments'), []);

  const columnsTable = useCreateColumnsTable({
    columns: columnsPayment,
    actions: ActionsTablePayment,
  });

  const dataTable = useDataTableManual<Payment>({
    columns: columnsTable,
    infoPagination: queryPayments.isSuccess
      ? {
          pageCount: queryPayments.data?.pageCount ?? 0,
          rowCount: queryPayments.data?.rowCount ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: queryPayments.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const mutationDeletePayments = useDeleteBulkPayments();
  const mutationDeletePayment = useDeletePayment();

  const contextValue: PaymentsModuleContextValues = {
    actionsPaymentsModule,
    queryPayments,
    dataTable,
    mutationDeletePayments,
    mutationDeletePayment,
    paramsQuery: {
      employee: { id: paramsValues.employee },
      filter_by_date: {
        type_filter_date: paramsValues.type_filter_date,
        date: !paramsValues.date ? undefined : new Date(paramsValues.date),
      },
      filter_by_total: {
        type_filter_total: paramsValues.type_filter_total,
        total: !paramsValues.total ? 0 : paramsValues.total,
      },
    },
  };

  return (
    <PaymentsModuleContext.Provider value={contextValue}>
      {children}
    </PaymentsModuleContext.Provider>
  );
};
