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
import { useDeleteBulkSales, useDeleteSale } from '../../hooks';
import {
  GetSalesProps,
  useGetAllSales,
} from '../../hooks/queries/useGetAllSales';
import { Sale } from '../../interfaces';
import { ActionsTableSale } from './ActionsTableSale';
import columnsSale from './ColumnsTableSale';
import {
  ItemQueryAdvanced,
  useAdvancedQueryDataPlus,
} from '@/modules/core/hooks/useAdvancedQueryDataPlus';

export interface paramQuerySale {
  clients: { id: string }[];
  crops: { id: string }[];
  filter_by_date: {
    type_filter_date: string | undefined;
    date: string | undefined | Date;
  };
  filter_by_total: {
    type_filter_total: string | undefined;
    total: number;
  };
  filter_by_quantity: {
    type_filter_quantity: string | undefined;
    quantity: number;
  };
}

export interface SalesModuleContextValues {
  paramsQuery: paramQuerySale;
  querySales: UseQueryGetAllRecordsReturn<Sale>;
  dataTable: DataTableManualReturn<Sale>;
  mutationDeleteSales: UseMutationReturn<void, BulkRecords>;
  mutationDeleteSale: UseMutationReturn<void, string>;
  actionsSalesModule: Record<string, boolean>;
  hasParamsQuery: boolean;
}

const paramsSale: ItemQueryAdvanced[] = [
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
    propertyName: 'filter_by_total',
    defaultValue: false,
  },
  {
    propertyName: 'type_filter_total',
    defaultValue: undefined,
  },
  {
    propertyName: 'filter_by_total',
    defaultValue: false,
  },
  {
    propertyName: 'type_filter_quantity',
    defaultValue: undefined,
  },
  {
    propertyName: 'quantity',
    defaultValue: 0,
  },

  {
    propertyName: 'clients',
    defaultValue: [],
    isArray: true,
  },
  {
    propertyName: 'crops',
    defaultValue: [],
    isArray: true,
  },
];

export const SalesModuleContext = createContext<
  SalesModuleContextValues | undefined
>(undefined);

export const SalesModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { paramsValues, hasValues } = useAdvancedQueryDataPlus(paramsSale);

  const {
    query: querySales,
    pagination,
    setPagination,
  } = useGetAllSales(paramsValues as GetSalesProps);

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
  const mutationDeleteSale = useDeleteSale();

  const contextValue: SalesModuleContextValues = {
    actionsSalesModule,
    querySales,
    dataTable,
    paramsQuery: {
      // ...paramsValues,
      filter_by_date: {
        type_filter_date: paramsValues.type_filter_date,
        date: !paramsValues.date ? undefined : new Date(paramsValues.date),
      },
      filter_by_total: {
        type_filter_total: paramsValues.type_filter_total,
        total: paramsValues.total,
      },
      filter_by_quantity: {
        type_filter_quantity: paramsValues.type_filter_quantity,
        quantity: paramsValues.quantity,
      },
      clients: paramsValues.clients.map((cl: string) => ({ id: cl })),
      crops: paramsValues.crops.map((cr: string) => ({ id: cr })),
      // filter_by_is_receivable: {
      //   is_receivable: undefined,
      // },
    },
    mutationDeleteSales,
    mutationDeleteSale,
    hasParamsQuery: hasValues,
  };

  return (
    <SalesModuleContext.Provider value={contextValue}>
      {children}
    </SalesModuleContext.Provider>
  );
};
