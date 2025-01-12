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
import { useDeleteBulkSales } from '../../hooks';
import { useGetAllSales } from '../../hooks/queries/useGetAllSales';
import { Sale } from '../../interfaces';
import { ActionsTableSale } from './ActionsTableSale';
import columnsSale from './ColumnsTableSale';

export interface paramQuerySale {
  filter_by_date: {
    type_filter_date: string | null | undefined;
    date: string | null | undefined | Date | unknown;
  };
  filter_by_total: {
    type_filter_total: string | null | undefined;
    total: string | null | undefined | unknown;
  };
  filter_by_quantity: {
    type_filter_quantity: string | null | undefined;
    quantity: string | null | undefined | unknown;
  };
}

export interface SalesModuleContextValues {
  paramsQuery: paramQuerySale;
  querySales: UseQueryGetAllRecordsReturn<Sale>;
  dataTable: DataTableManualReturn<Sale>;
  mutationDeleteSales: UseMutationReturn<void, BulkRecords>;
  actionsSalesModule: Record<string, boolean>;
}

export const SalesModuleContext = createContext<
  SalesModuleContextValues | undefined
>(undefined);

export const SalesModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children,
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

      // 'filter_by_is_receivable',
      // 'is_receivable',
    ],
  });

  const {
    query: querySales,
    pagination,
    setPagination,
  } = useGetAllSales({
    ...paramsValues,
  });

  const { getActionsModule } = useAuthContext();

  const actionsSalesModule = useMemo(() => getActionsModule('sales'), []);

  const columnsTable = useCreateColumnsTable({
    columns: columnsSale,
    actions: ActionsTableSale,
  });

  const dataTable = useDataTableManual<Sale>({
    columns: columnsTable,
    infoPagination: querySales.isSuccess
      ? {
          pageCount: querySales.data?.pageCount ?? 0,
          rowCount: querySales.data?.rowCount ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: querySales.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteSales = useDeleteBulkSales();

  const contextValue: SalesModuleContextValues = {
    actionsSalesModule,
    querySales,
    dataTable,
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
    mutationDeleteSales,
  };

  return (
    <SalesModuleContext.Provider value={contextValue}>
      {children}
    </SalesModuleContext.Provider>
  );
};
