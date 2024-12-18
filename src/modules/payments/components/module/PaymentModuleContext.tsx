import { useAuthContext } from '@/auth';
import { useDataTableManual } from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useAdvancedQueryData } from '@/modules/core/hooks/useAdvancedQueryData';
import { createContext } from 'react';

import { useGetAllPayments } from '../../hooks/queries/useGetAllPayments';
import columnsPayment from './ColumnsTablePayment';
import { ActionsTablePayment } from './ActionsTablePayment';

export const PaymentsModuleContext = createContext<any>(null);

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

  const { query, pagination, setPagination } = useGetAllPayments({
    ...paramsValues,
  });

  const { validatePermissionsInModule } = useAuthContext();

  const permissionsPayment = validatePermissionsInModule('payments');

  const columnsTable = useCreateColumnsTable({
    columns: columnsPayment,
    actions: ActionsTablePayment,
  });

  const dataTable = useDataTableManual({
    columns: columnsTable,
    data: query.data ?? [],
    rows: query.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const contextValue = {
    permissionsPayment,
    query,
    ...dataTable,
    // FIX: Corregir paramsQuery
    paramsQuery: {
      ...paramsValues,
      filter_by_date: {
        type_filter_date: paramsValues.type_filter_date,
        date: !paramsValues.date ? undefined : new Date(paramsValues.date),
      },
      filter_by_total: {
        type_filter_total: paramsValues.type_filter_total,
        total: !paramsValues.total ? 0 : paramsValues.total,
      },
      filter_by_quantity: {
        type_filter_quantity: paramsValues.type_filter_quantity,
        quantity: !paramsValues.quantity ? 0 : paramsValues.quantity,
      },
      // filter_by_is_receivable: {
      //   is_receivable: undefined,
      // },
    },
  };

  return (
    <PaymentsModuleContext.Provider value={contextValue}>
      {children}
    </PaymentsModuleContext.Provider>
  );
};
