import { useAuthContext } from '@/auth';
import { useDataTableManual } from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useAdvancedQueryData } from '@/modules/core/hooks/useAdvancedQueryData';
import { createContext } from 'react';

import { useGetAllSales } from '../../hooks/queries/useGetAllSales';
import columnsSale from './ColumnsTableSale';
import { ActionsTableSale } from './ActionsTableSale';

export const SalesModuleContext = createContext<any>(null);

export const SalesModuleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { paramsValues } = useAdvancedQueryData({
    params: [
      'filter_by_date',
      'type_filter_date',
      'date',

      'filter_by_total',
      'type_filter_total',
      'total',

      'filter_by_quantity',
      'type_filter_quantity',
      'quantity',

      'filter_by_is_receivable',
      'type_filter_is_receivable',
      'is_receivable',
    ],
  });

  // FIX: Por corregir parametros hook
  const { query, pagination, setPagination } = useGetAllSales({
    ...paramsValues,
  });

  const { validatePermissionsInModule } = useAuthContext();

  const permissionsSale = validatePermissionsInModule('sales');

  const columnsTable = useCreateColumnsTable({
    columns: columnsSale,
    actions: ActionsTableSale,
  });

  const dataTable = useDataTableManual({
    columns: columnsTable,
    data: query.data ?? [],
    rows: query.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const contextValue = {
    permissionsSale,
    query,
    ...dataTable,
    // FIX: Corregir paramsQuery
    paramsQuery: {
      ...paramsValues,
      crop: { id: paramsValues.crop },
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
    },
  };

  return (
    <SalesModuleContext.Provider value={contextValue}>
      {children}
    </SalesModuleContext.Provider>
  );
};
