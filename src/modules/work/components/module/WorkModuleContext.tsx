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
import { useDeleteBulkWorks } from '../../hooks/mutations/useDeleteBulkWorks';
import { useGetAllWorks } from '../../hooks/queries/useGetAllWorks';
import { Work } from '../../interfaces/Work';
import { ActionsTableWork } from './ActionsTableWork';
import columnsWork from './ColumnsTableWork';

export interface paramQueryWork {
  crop: { id: string | null | undefined };
  filter_by_date: {
    type_filter_date: string | null | undefined;
    date: string | null | undefined | Date | unknown;
  };
  filter_by_total: {
    type_filter_total: string | null | undefined;
    total: string | null | undefined | unknown;
  };
}

export interface WorksModuleContextValues {
  paramsQuery: paramQueryWork;
  queryWorks: UseQueryGetAllRecordsReturn<Work>;
  dataTable: DataTableManualReturn<Work>;
  mutationDeleteWorks: UseMutationReturn<void, BulkRecords>;
  actionsWorksModule: Record<string, boolean>;
}

export const WorksModuleContext = createContext<
  WorksModuleContextValues | undefined
>(undefined);

export const WorksModuleProvider: React.FC<{
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
    ],
  });

  // FIX: Por corregir parametros hook
  const {
    query: queryWorks,
    pagination,
    setPagination,
  } = useGetAllWorks({
    ...paramsValues,
  });

  const { getActionsModule } = useAuthContext();

  const actionsWorksModule = useMemo(() => getActionsModule('works'), []);

  const columnsTable = useCreateColumnsTable({
    columns: columnsWork,
    actions: ActionsTableWork,
  });

  const dataTable = useDataTableManual<Work>({
    columns: columnsTable,
    infoPagination: queryWorks.isSuccess
      ? {
          pageCount: queryWorks.data?.pageCount ?? 0,
          rowCount: queryWorks.data?.rowCount ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: queryWorks.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteWorks = useDeleteBulkWorks();

  const contextValue: WorksModuleContextValues = {
    actionsWorksModule,
    queryWorks,
    dataTable,
    mutationDeleteWorks,
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
    },
  };

  return (
    <WorksModuleContext.Provider value={contextValue}>
      {children}
    </WorksModuleContext.Provider>
  );
};
