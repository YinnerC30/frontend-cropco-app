import { useAuthContext } from '@/auth';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { createContext, useMemo } from 'react';

import {
  ItemQueryAdvanced,
  useAdvancedQueryDataPlus,
} from '@/modules/core/hooks/useAdvancedQueryDataPlus';
import { BulkRecords } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useDeleteBulkShopping } from '../../hooks/mutations/useDeleteBulkShopping';
import { useDeleteShopping } from '../../hooks/mutations/useDeleteShopping';
import {
  GetShoppingProps,
  useGetAllShopping,
} from '../../hooks/queries/useGetAllShopping';
import { ShoppingSupplies } from '../../interfaces';
import { ActionsTableShopping } from './ActionsTableShopping';
import columnsShopping from './ColumnsTableShopping';

export interface paramQueryShopping {
  filter_by_date: {
    type_filter_date: string | undefined;
    date: undefined | Date;
  };
  filter_by_total: {
    type_filter_total: string | undefined;
    total: number;
  };
  suppliers: { id: string }[];
  supplies: { id: string }[];
}

export interface ShoppingModuleContextValues {
  paramsQuery: paramQueryShopping;
  queryShopping: UseQueryGetAllRecordsReturn<ShoppingSupplies>;
  dataTable: DataTableManualReturn<ShoppingSupplies>;
  mutationDeleteShopping: UseMutationReturn<void, BulkRecords>;
  mutationDeleteOneShopping: UseMutationReturn<void, string>;
  actionsShoppingModule: Record<string, boolean>;
  hasParamsQuery: boolean;
}

const paramsShopping: ItemQueryAdvanced[] = [
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
    propertyName: 'supplies',
    defaultValue: [],
    isArray: true,
  },
  {
    propertyName: 'suppliers',
    defaultValue: [],
    isArray: true,
  },
];

export const ShoppingModuleContext = createContext<
  ShoppingModuleContextValues | undefined
>(undefined);

export const ShoppingModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
  const { paramsValues, hasValues } = useAdvancedQueryDataPlus(paramsShopping);

  const {
    query: queryShopping,
    pagination,
    setPagination,
  } = useGetAllShopping(paramsValues as GetShoppingProps);

  const { getActionsModule } = useAuthContext();

  const actionsShoppingModule = useMemo(() => getActionsModule('shopping'), []);

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
  const mutationDeleteOneShopping = useDeleteShopping();

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
      suppliers: paramsValues.suppliers.map((spr: string) => ({ id: spr })),
      supplies: paramsValues.supplies.map((sup: string) => ({ id: sup })),
    },
    mutationDeleteShopping,
    mutationDeleteOneShopping,
    hasParamsQuery: hasValues,
  };

  return (
    <ShoppingModuleContext.Provider value={contextValue}>
      {children}
    </ShoppingModuleContext.Provider>
  );
};
