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
import { useDeleteBulkConsumption } from '../../hooks/mutations/useDeleteBulkConsumption';
import { useDeleteConsumption } from '../../hooks/mutations/useDeleteConsumption';
import {
  GetConsumptionsProps,
  useGetAllConsumptions,
} from '../../hooks/queries/useGetAllConsumptions';
import { ConsumptionSupplies } from '../../interfaces';
import { ActionsTableConsumption } from './ActionsTableConsumption';
import columnsConsumption from './ColumnsTableConsumption';

export interface paramQueryConsumption {
  filter_by_date: {
    type_filter_date: string | null | undefined;
    date: string | null | undefined | Date | unknown;
  };
  crops: { id: string }[];
  supplies: { id: string }[];
}

export interface ConsumptionsModuleContextValues {
  paramsQuery: paramQueryConsumption;
  queryConsumptions: UseQueryGetAllRecordsReturn<ConsumptionSupplies>;
  dataTable: DataTableManualReturn<ConsumptionSupplies>;
  mutationDeleteConsumptions: UseMutationReturn<void, BulkRecords>;
  mutationDeleteConsumption: UseMutationReturn<void, string>;
  actionsConsumptionsModule: Record<string, boolean>;
  hasParamsQuery: boolean;
}

const paramsConsumption: ItemQueryAdvanced[] = [
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
    propertyName: 'supplies',
    defaultValue: [],
    isArray: true,
  },
  {
    propertyName: 'crops',
    defaultValue: [],
    isArray: true,
  },
];

export const ConsumptionModuleContext = createContext<
  ConsumptionsModuleContextValues | undefined
>(undefined);

export const ConsumptionModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { paramsValues, hasValues } =
    useAdvancedQueryDataPlus(paramsConsumption);

  const {
    query: queryConsumptions,
    pagination,
    setPagination,
  } = useGetAllConsumptions(paramsValues as GetConsumptionsProps);

  const { getActionsModule } = useAuthContext();

  const actionsConsumptionsModule = useMemo(
    () => getActionsModule('consumptions'),
    []
  );

  const columnsTable = useCreateColumnsTable({
    columns: columnsConsumption,
    actions: ActionsTableConsumption,
  });

  const dataTable = useDataTableManual<ConsumptionSupplies>({
    columns: columnsTable,
    infoPagination: queryConsumptions.isSuccess
      ? {
          pageCount: queryConsumptions.data?.pageCount ?? 0,
          rowCount: queryConsumptions.data?.rowCount ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: queryConsumptions.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteConsumptions = useDeleteBulkConsumption();
  const mutationDeleteConsumption = useDeleteConsumption();

  const contextValue: ConsumptionsModuleContextValues = {
    actionsConsumptionsModule,
    queryConsumptions,
    dataTable,
    paramsQuery: {
      filter_by_date: {
        type_filter_date: paramsValues.type_filter_date,
        date: !paramsValues.date ? undefined : new Date(paramsValues.date),
      },
      crops: paramsValues.crops.map((cr: string) => ({ id: cr })),
      supplies: paramsValues.supplies.map((sup: string) => ({ id: sup })),
    },
    mutationDeleteConsumptions,
    mutationDeleteConsumption,
    hasParamsQuery: hasValues,
  };

  return (
    <ConsumptionModuleContext.Provider value={contextValue}>
      {children}
    </ConsumptionModuleContext.Provider>
  );
};
