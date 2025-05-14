import { useAuthContext } from '@/auth';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import {
  ItemQueryAdvanced,
  useAdvancedQueryDataPlus,
} from '@/modules/core/hooks/useAdvancedQueryDataPlus';
import { BulkRecords } from '@/modules/core/interfaces';
import { FilterSearchBar } from '@/modules/core/interfaces/queries/FilterSearchBar';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import React, { createContext, useMemo, useState } from 'react';
import { useDeleteHarvest, useGetAllHarvests } from '../../hooks';
import { useDeleteBulkHarvests } from '../../hooks/mutations/useDeleteBulkHarvests';
import { Harvest } from '../../interfaces';
import { ActionsTableHarvest } from './ActionsTableHarvest';
import columnsHarvest from './ColumnsTableHarvest';
import { useGetHarvestPDF } from '../../hooks/queries/useGetHarvestPDF';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface paramQueryHarvest {
  crop: { id: string };
  employees: { id: string }[];
  filter_by_date: {
    type_filter_date: string | undefined;
    date: string | undefined | Date;
  };
  filter_by_total: {
    type_filter_total: string | undefined;
    total: number;
  };
  filter_by_value_pay: {
    type_filter_value_pay: string | undefined;
    value_pay: number;
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
  hasParamsQuery: boolean;

  queryGetDocument: UseQueryResult<Blob, AxiosError>;
  harvestIdDocument: string;
  setHarvestIdDocument: React.Dispatch<React.SetStateAction<string>>;
  setExecuteQuery: React.Dispatch<React.SetStateAction<boolean>>;
}

const paramsHarvest: ItemQueryAdvanced[] = [
  {
    propertyName: 'crop',
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
    propertyName: 'filter_by_total',
    defaultValue: false,
  },
  {
    propertyName: 'type_filter_total',
    defaultValue: undefined,
  },
  {
    propertyName: 'total',
    defaultValue: 0,
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
    defaultValue: 0,
  },
  {
    propertyName: 'employees',
    defaultValue: [],
    isArray: true,
  },
];

export const HarvestsModuleContext = createContext<
  HarvestsModuleContextProps | undefined
>(undefined);

export const HarvestsModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { paramsValues, hasValues } = useAdvancedQueryDataPlus(paramsHarvest);

  const {
    query: queryHarvests,
    pagination,
    setPagination,
  } = useGetAllHarvests({
    ...paramsValues,
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
          pageCount: queryHarvests.data?.total_page_count ?? 0,
          rowCount: queryHarvests.data?.total_row_count ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: queryHarvests.data?.records ?? [],
    pagination,
    setPagination,
  });

  const [harvestIdDocument, setHarvestIdDocument] = useState('');
  const [executeQuery, setExecuteQuery] = useState(false);

  const queryGetDocument = useGetHarvestPDF({
    harvestId: harvestIdDocument,
    stateQuery: executeQuery,
    actionPDF: 'ViewPDF',
    actionOnSuccess: () => {
      setExecuteQuery(false);
      setHarvestIdDocument('');
    },
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
        total: paramsValues.total,
      },
      filter_by_value_pay: {
        type_filter_value_pay: paramsValues.type_filter_value_pay,
        value_pay: paramsValues.value_pay,
      },
      employees: paramsValues.employees.map((em: string) => ({ id: em })),
    },
    hasParamsQuery: hasValues,
    queryGetDocument,
    harvestIdDocument,
    setHarvestIdDocument,
    setExecuteQuery,
  };

  return (
    <HarvestsModuleContext.Provider value={contextValue}>
      {children}
    </HarvestsModuleContext.Provider>
  );
};
