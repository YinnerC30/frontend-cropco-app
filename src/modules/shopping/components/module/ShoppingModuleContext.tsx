import { useAuthContext } from '@/auth';
import { useDataTableManual } from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useAdvancedQueryData } from '@/modules/core/hooks/useAdvancedQueryData';
import { createContext } from 'react';

import { useGetAllShopping } from '../../hooks/queries/useGetAllShopping';
import columnsShopping from './ColumnsTableShopping';
import { ActionsTableShopping } from './ActionsTableShopping';

export const ShoppingModuleContext = createContext<any>(null);

export const ShoppingModuleProvider = ({
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
    ],
  });

  const { query, pagination, setPagination } = useGetAllShopping({
    ...paramsValues,
  });

  const { validatePermissionsInModule } = useAuthContext();

  const permissionsShopping = validatePermissionsInModule('supplies');

  const columnsTable = useCreateColumnsTable({
    columns: columnsShopping,
    actions: ActionsTableShopping,
  });

  const dataTable = useDataTableManual({
    columns: columnsTable,
    data: query.data ?? [],
    rows: query.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const contextValue = {
    permissionsShopping,
    query,
    ...dataTable,

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
    },
  };

  return (
    <ShoppingModuleContext.Provider value={contextValue}>
      {children}
    </ShoppingModuleContext.Provider>
  );
};
