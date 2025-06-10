import { useAuthContext } from '@/auth';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { createContext, useEffect, useMemo, useState } from 'react';

import {
  ItemQueryAdvanced,
  useAdvancedQueryDataPlus,
} from '@/modules/core/hooks/useAdvancedQueryDataPlus';
import { BulkRecords } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useDeleteBulkPayments } from '../../hooks/mutations/useDeleteBulkPayments';
import { useDeletePayment } from '../../hooks/mutations/useDeletePayment';
import { useGetAllPayments } from '../../hooks/queries/useGetAllPayments';
import { useGetPaymentPDF } from '../../hooks/queries/useGetPaymentPDF';
import { Payment } from '../../interfaces/Payment';
import { ActionsTablePayment } from './ActionsTablePayment';
import columnsPayment from './ColumnsTablePayment';
import { useGetAllEmployeesWithMadePayments } from '../../hooks/queries/useGetAllEmployeesWithMadePayments';
import { Employee } from '@/modules/employees/interfaces/Employee';

export interface paramQueryPayment {
  employee: { id: string | null | undefined };
  filter_by_date: {
    type_filter_date: string | null | undefined;
    date: string | null | undefined | Date | unknown;
  };
  filter_by_value_pay: {
    type_filter_value_pay: string | null | undefined;
    value_pay: string | null | undefined | unknown;
  };
  filter_by_method_of_payment: {
    method_of_payment: string | null | undefined;
  };
}

export interface PaymentsModuleContextValues {
  paramsQuery: paramQueryPayment;
  queryPayments: UseQueryGetAllRecordsReturn<Payment>;
  dataTable: DataTableManualReturn<Payment>;
  mutationDeletePayments: UseMutationReturn<void, BulkRecords>;
  mutationDeletePayment: UseMutationReturn<void, string>;
  actionsPaymentsModule: Record<string, boolean>;
  hasParamsQuery: boolean;
  queryGetDocument: UseQueryResult<Blob, AxiosError>;
  paymentIdDocument: string;
  setPaymentIdDocument: React.Dispatch<React.SetStateAction<string>>;
  setExecuteQuery: React.Dispatch<React.SetStateAction<boolean>>;
  queryEmployees: UseQueryGetAllRecordsReturn<Employee>;
}

export const PaymentsModuleContext = createContext<
  PaymentsModuleContextValues | undefined
>(undefined);

const paramsPayments: ItemQueryAdvanced[] = [
  {
    propertyName: 'employee',
    defaultValue: '',
  },
  {
    propertyName: 'filter_by_date',
    defaultValue: false,
  },
  {
    propertyName: 'type_filter_date',
    defaultValue: undefined,
  },
  {
    propertyName: 'date',
    defaultValue: undefined,
  },
  {
    propertyName: 'filter_by_value_pay',
    defaultValue: false,
  },
  {
    propertyName: 'type_filter_value_pay',
    defaultValue: undefined,
  },
  {
    propertyName: 'value_pay',
    defaultValue: undefined,
  },
  {
    propertyName: 'filter_by_method_of_payment',
    defaultValue: false,
  },
  {
    propertyName: 'method_of_payment',
    defaultValue: undefined,
  },
];

export const PaymentsModuleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { paramsValues, hasValues, } = useAdvancedQueryDataPlus(paramsPayments);

  const {
    query: queryPayments,
    pagination,
    setPagination,
  } = useGetAllPayments({
    ...paramsValues,
  });

  const queryEmployees = useGetAllEmployeesWithMadePayments();

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
          pageCount: queryPayments.data?.total_page_count ?? 0,
          rowCount: queryPayments.data?.total_row_count ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: queryPayments.data?.records ?? [],
    pagination,
    setPagination,
  });

  const mutationDeletePayments = useDeleteBulkPayments();
  const mutationDeletePayment = useDeletePayment();

  const [paymentIdDocument, setPaymentIdDocument] = useState('');
  const [executeQuery, setExecuteQuery] = useState(false);

  const queryGetDocument = useGetPaymentPDF({
    paymentId: paymentIdDocument,
    stateQuery: executeQuery,
    actionPDF: 'DownloadPDF',
    actionOnSuccess: () => {
      setExecuteQuery(false);
      setPaymentIdDocument('');
    },
  });

  useEffect(() => {
    if (hasValues) {
      setPagination({ pageIndex: 0, pageSize: 10 });
    }
  }, [hasValues]);

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
      filter_by_value_pay: {
        type_filter_value_pay: paramsValues.type_filter_value_pay,
        value_pay: !paramsValues.value_pay ? 0 : paramsValues.value_pay,
      },
      filter_by_method_of_payment: {
        method_of_payment: paramsValues.method_of_payment,
      },
    },
    paymentIdDocument,
    setExecuteQuery,
    setPaymentIdDocument,
    queryGetDocument,
    queryEmployees,
    hasParamsQuery: hasValues,
  };

  return (
    <PaymentsModuleContext.Provider value={contextValue}>
      {children}
    </PaymentsModuleContext.Provider>
  );
};
