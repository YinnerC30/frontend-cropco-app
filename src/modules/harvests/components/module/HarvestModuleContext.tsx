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
import { BulkRecords, ResponseApiGetAllRecords } from '@/modules/core/interfaces';
import { FilterSearchBar } from '@/modules/core/interfaces/queries/FilterSearchBar';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useDeleteHarvest, useGetAllHarvests } from '../../hooks';
import { useDeleteBulkHarvests } from '../../hooks/mutations/useDeleteBulkHarvests';
import { Harvest } from '../../interfaces';
import { ActionsTableHarvest } from './ActionsTableHarvest';
import columnsHarvest from './ColumnsTableHarvest';
import { useGetHarvestPDF } from '../../hooks/queries/useGetHarvestPDF';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UseDeleteBulkResponse } from '@/modules/core/interfaces/responses/UseDeleteBulkResponse';
import { useGetAllCropsWithHarvest } from '@/modules/crops/hooks';
import { useGetAllEmployeesWithHarvests } from '@/modules/payments/hooks/queries/useGetAllEmployeesWithHarvests';
import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { Crop } from '@/modules/crops/interfaces/Crop';
import { Employee } from '@/modules/employees/interfaces/Employee';
import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';

export interface paramQueryHarvest {
  crop: { id: string };
  employees: { id: string }[];
  filter_by_date: {
    type_filter_date: string | undefined;
    date: string | undefined | Date;
  };
  filter_by_amount: {
    type_filter_amount: string | undefined;
    type_unit_of_measure: MassUnitOfMeasure | undefined;
    amount: number;
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
  mutationDeleteHarvests: UseMutationReturn<UseDeleteBulkResponse, BulkRecords>;
  mutationDeleteHarvest: UseMutationReturn<void, string>;
  actionsHarvestsModule: Record<string, boolean>;
  appliedFilters: FilterSearchBar[];
  setAppliedFilters: React.Dispatch<React.SetStateAction<FilterSearchBar[]>>;
  hasParamsQuery: boolean;

  queryGetDocument: UseQueryResult<Blob, AxiosError>;
  harvestIdDocument: string;
  setHarvestIdDocument: React.Dispatch<React.SetStateAction<string>>;
  setExecuteQuery: React.Dispatch<React.SetStateAction<boolean>>;

  queryCrops: UseQueryResult<ResponseApiGetAllRecords<Crop>, AxiosError<TypedAxiosError, unknown>>;
  queryEmployees: UseQueryGetAllRecordsReturn<Employee>;
  unitTypeToShowAmount: MassUnitOfMeasure;
  setUnitTypeToShowAmount: React.Dispatch<
    React.SetStateAction<MassUnitOfMeasure>
  >;
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
    propertyName: 'filter_by_amount',
    defaultValue: false,
  },
  {
    propertyName: 'type_unit_of_measure',
    defaultValue: MassUnitOfMeasure.KILOGRAMOS,
  },
  {
    propertyName: 'type_filter_amount',
    defaultValue: undefined,
  },
  {
    propertyName: 'amount',
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

  const { query: queryCrops } = useGetAllCropsWithHarvest({
    queryValue: '',
    all_records: true,
  });

  const queryEmployees = useGetAllEmployeesWithHarvests();

  const { getActionsModule } = useAuthContext();

  const [appliedFilters, setAppliedFilters] = useState<FilterSearchBar[]>([]);

  const actionsHarvestsModule = useMemo(() => getActionsModule('harvests'), []);

  const [unitTypeToShowAmount, setUnitTypeToShowAmount] =
    useState<MassUnitOfMeasure>(MassUnitOfMeasure.KILOGRAMOS);

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
    actionPDF: 'DownloadPDF',
    actionOnSuccess: () => {
      setExecuteQuery(false);
      setHarvestIdDocument('');
    },
  });

  const mutationDeleteHarvests = useDeleteBulkHarvests();

  const mutationDeleteHarvest = useDeleteHarvest();

  useEffect(() => {
    if (hasValues) {
      setPagination({ pageIndex: 0, pageSize: 10 });
    }
  }, [hasValues]);

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
      filter_by_amount: {
        type_filter_amount: paramsValues.type_filter_amount,
        amount: paramsValues.amount,
        type_unit_of_measure: paramsValues.type_unit_of_measure,
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
    queryCrops,
    queryEmployees,
    unitTypeToShowAmount,
    setUnitTypeToShowAmount,
  };

  return (
    <HarvestsModuleContext.Provider value={contextValue}>
      {children}
    </HarvestsModuleContext.Provider>
  );
};
