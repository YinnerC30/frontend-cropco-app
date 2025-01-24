import { useAuthContext } from '@/auth';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useAdvancedQueryData } from '@/modules/core/hooks/useAdvancedQueryData';
import { BulkRecords } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import React, { createContext, useMemo, useState } from 'react';
import { useDeleteHarvest, useGetAllHarvests } from '../../hooks';
import { useDeleteBulkHarvests } from '../../hooks/mutations/useDeleteBulkHarvests';
import { Harvest } from '../../interfaces';
import { ActionsTableHarvest } from './ActionsTableHarvest';
import columnsHarvest from './ColumnsTableHarvest';
import { FilterSearchBar } from '@/modules/core/interfaces/queries/FilterSearchBar';

export interface paramQueryHarvest {
  crop: { id: string | null | undefined };
  employees: string[] | undefined;
  filter_by_date: {
    type_filter_date: string | null | undefined;
    date: string | null | undefined | Date | unknown;
  };
  filter_by_total: {
    type_filter_total: string | null | undefined;
    total: string | null | undefined | unknown;
  };
  filter_by_value_pay: {
    type_filter_value_pay: string | null | undefined;
    value_pay: string | null | undefined | unknown;
  };
}

export interface HarvestsModuleContextProps {
  paramsQuery: paramQueryHarvest;
  queryHarvests: UseQueryGetAllRecordsReturn<Harvest>;
  dataTable: DataTableManualReturn<Harvest>;
  mutationDeleteHarvests: UseMutationReturn<void, BulkRecords>;
  mutationDeleteHarvest: UseMutationReturn<void, string>;
  actionsHarvestsModule: Record<string, boolean>;
  appliedFilters: FilterSearchBar[];
  setAppliedFilters: React.Dispatch<React.SetStateAction<FilterSearchBar[]>>;
}

export const HarvestsModuleContext = createContext<
  HarvestsModuleContextProps | undefined
>(undefined);

export const HarvestsModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { paramsValues } = useAdvancedQueryData({
    params: [
      'crop',

      'filter_by_date',
      'type_filter_date',
      'date',

      'filter_by_total',
      'type_filter_total',
      'total',

      'filter_by_value_pay',
      'type_filter_value_pay',
      'value_pay',

      'employees',
    ],
  });

  const {
    query: queryHarvests,
    pagination,
    setPagination,
  } = useGetAllHarvests({
    ...paramsValues,
    employees:
      paramsValues.employees?.split(',').length === 0
        ? []
        : Array.isArray(paramsValues.employees?.split(','))
        ? [...paramsValues.employees?.split(',')]
        : [],
  });

  const { getActionsModule } = useAuthContext();

  const [appliedFilters, setAppliedFilters] = useState<FilterSearchBar[]>([]);

  const actionsHarvestsModule = useMemo(() => getActionsModule('harvests'), []);

  const columnsTable = useCreateColumnsTable<Harvest>({
    columns: columnsHarvest,
    actions: ActionsTableHarvest,
  });

  const dataTable = useDataTableManual<Harvest>({
    columns: columnsTable,
    infoPagination: queryHarvests.isSuccess
      ? {
          pageCount: queryHarvests.data?.pageCount ?? 0,
          rowCount: queryHarvests.data?.rowCount ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: queryHarvests.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteHarvests = useDeleteBulkHarvests();

  const mutationDeleteHarvest = useDeleteHarvest();

  const contextValue: HarvestsModuleContextProps = {
    mutationDeleteHarvests,
    mutationDeleteHarvest,
    actionsHarvestsModule,
    queryHarvests,
    dataTable,
    appliedFilters,
    setAppliedFilters,
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
      filter_by_value_pay: {
        type_filter_value_pay: paramsValues.type_filter_value_pay,
        value_pay: !paramsValues.value_pay ? 0 : paramsValues.value_pay,
      },
      employees: !paramsValues.employees
        ? []
        : Array.isArray(paramsValues.employees)
        ? [...paramsValues.employees]
        : [],
    },
  };

  return (
    <HarvestsModuleContext.Provider value={contextValue}>
      {children}
    </HarvestsModuleContext.Provider>
  );
};
