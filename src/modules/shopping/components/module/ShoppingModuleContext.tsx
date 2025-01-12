import { useAuthContext } from '@/auth';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useAdvancedQueryData } from '@/modules/core/hooks/useAdvancedQueryData';
import { createContext, useMemo } from 'react';

import { BulkRecords } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responsess/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/UseQueryGetAllRecordsReturn';
import { useDeleteBulkShopping } from '../../hooks/mutations/useDeleteBulkShopping';
import { useGetAllShopping } from '../../hooks/queries/useGetAllShopping';
import { ShoppingSupplies } from '../../interfaces';
import { ActionsTableShopping } from './ActionsTableShopping';
import columnsShopping from './ColumnsTableShopping';

export interface paramQueryShopping {
  filter_by_date: {
    type_filter_date: string | null | undefined;
    date: string | null | undefined | Date | unknown;
  };
  filter_by_total: {
    type_filter_total: string | null | undefined;
    total: string | null | undefined | unknown;
  };
}

export interface ShoppingModuleContextValues {
  paramsQuery: paramQueryShopping;
  queryShopping: UseQueryGetAllRecordsReturn<ShoppingSupplies>;
  dataTable: DataTableManualReturn<ShoppingSupplies>;
  mutationDeleteShopping: UseMutationReturn<void, BulkRecords>;
  actionsShoppingModule: Record<string, boolean>;
}

export const ShoppingModuleContext = createContext<
  ShoppingModuleContextValues | undefined
>(undefined);

export const ShoppingModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
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

  const {
    query: queryShopping,
    pagination,
    setPagination,
  } = useGetAllShopping({
    ...paramsValues,
  });

  const { getActionsModule } = useAuthContext();

  const actionsShoppingModule = useMemo(() => getActionsModule('supplies'), []);

  const columnsTable = useCreateColumnsTable({
    columns: columnsShopping,
    actions: ActionsTableShopping,
  });

  const dataTable = useDataTableManual<ShoppingSupplies>({
    columns: columnsTable,
    infoPagination: queryShopping.isSuccess
      ? {
          pageCount: queryShopping.data?.pageCount ?? 0,
          rowCount: queryShopping.data?.rowCount ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: queryShopping.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteShopping = useDeleteBulkShopping();

  const contextValue: ShoppingModuleContextValues = {
    actionsShoppingModule,
    queryShopping,
    dataTable,
    paramsQuery: {
      filter_by_date: {
        type_filter_date: paramsValues.type_filter_date,
        date: !paramsValues.date ? undefined : new Date(paramsValues.date),
      },
      filter_by_total: {
        type_filter_total: paramsValues.type_filter_total,
        total: !paramsValues.total ? 0 : paramsValues.total,
      },
    },
    mutationDeleteShopping,
  };

  return (
    <ShoppingModuleContext.Provider value={contextValue}>
      {children}
    </ShoppingModuleContext.Provider>
  );
};
