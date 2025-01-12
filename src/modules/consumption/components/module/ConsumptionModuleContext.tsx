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
import { useDeleteBulkConsumption } from '../../hooks/mutations/useDeleteBulkConsumption';
import { useGetAllConsumptions } from '../../hooks/queries/useGetAllConsumptions';
import { ConsumptionSupplies } from '../../interfaces';
import { ActionsTableConsumption } from './ActionsTableConsumption';
import columnsConsumption from './ColumnsTableConsumption';

export interface paramQueryConsumption {
  filter_by_date: {
    type_filter_date: string | null | undefined;
    date: string | null | undefined | Date | unknown;
  };
}

export interface ConsumptionsModuleContextValues {
  paramsQuery: paramQueryConsumption;
  queryConsumptions: UseQueryGetAllRecordsReturn<ConsumptionSupplies>;
  dataTable: DataTableManualReturn<ConsumptionSupplies>;
  mutationDeleteConsumptions: UseMutationReturn<void, BulkRecords>;
  actionsConsumptionsModule: Record<string, boolean>;
}

export const ConsumptionModuleContext = createContext<
  ConsumptionsModuleContextValues | undefined
>(undefined);

export const ConsumptionModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { paramsValues } = useAdvancedQueryData({
    params: ['filter_by_date', 'type_filter_date', 'date'],
  });

  const {
    query: queryConsumptions,
    pagination,
    setPagination,
  } = useGetAllConsumptions({
    ...paramsValues,
  });

  const { getActionsModule } = useAuthContext();

  const actionsConsumptionsModule = useMemo(
    () => getActionsModule('supplies'),
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

  const contextValue: ConsumptionsModuleContextValues = {
    actionsConsumptionsModule,
    queryConsumptions,
    dataTable,
    paramsQuery: {
      filter_by_date: {
        type_filter_date: paramsValues.type_filter_date,
        date: !paramsValues.date ? undefined : new Date(paramsValues.date),
      },
    },
    mutationDeleteConsumptions,
  };

  return (
    <ConsumptionModuleContext.Provider value={contextValue}>
      {children}
    </ConsumptionModuleContext.Provider>
  );
};
