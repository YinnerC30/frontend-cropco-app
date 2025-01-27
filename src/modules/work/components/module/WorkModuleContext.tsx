import { useAuthContext } from '@/auth';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { createContext, useMemo, useState } from 'react';

import {
  ItemQueryAdvanced,
  useAdvancedQueryDataPlus,
} from '@/modules/core/hooks/useAdvancedQueryDataPlus';
import { BulkRecords } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useDeleteBulkWorks } from '../../hooks/mutations/useDeleteBulkWorks';
import { useDeleteWork } from '../../hooks/mutations/useDeleteWork';
import { useGetAllWorks } from '../../hooks/queries/useGetAllWorks';
import { Work } from '../../interfaces/Work';
import { ActionsTableWork } from './ActionsTableWork';
import columnsWork from './ColumnsTableWork';
import { useGetWorkPDF } from '../../hooks/queries/useGetWorkPDF';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface paramQueryWork {
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
}

export interface WorksModuleContextValues {
  paramsQuery: paramQueryWork;
  queryWorks: UseQueryGetAllRecordsReturn<Work>;
  dataTable: DataTableManualReturn<Work>;
  mutationDeleteWorks: UseMutationReturn<void, BulkRecords>;
  mutationDeleteWork: UseMutationReturn<void, string>;
  actionsWorksModule: Record<string, boolean>;
  hasParamsQuery: boolean;

  queryGetDocument: UseQueryResult<Blob, AxiosError>;
  workIdDocument: string;
  setWorkIdDocument: React.Dispatch<React.SetStateAction<string>>;
  setExecuteQuery: React.Dispatch<React.SetStateAction<boolean>>;
}

const paramsWorks: ItemQueryAdvanced[] = [
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
    propertyName: 'employees',
    defaultValue: [],
    isArray: true,
  },
];

export const WorksModuleContext = createContext<
  WorksModuleContextValues | undefined
>(undefined);

export const WorksModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { paramsValues, hasValues } = useAdvancedQueryDataPlus(paramsWorks);

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
  const mutationDeleteWork = useDeleteWork();

  const [workIdDocument, setWorkIdDocument] = useState('');
  const [executeQuery, setExecuteQuery] = useState(false);

  const queryGetDocument = useGetWorkPDF({
    workId: workIdDocument,
    stateQuery: executeQuery,
    actionPDF: 'ViewPDF',
    actionOnSuccess: () => {
      setExecuteQuery(false);
      setWorkIdDocument('');
    },
  });

  const contextValue: WorksModuleContextValues = {
    actionsWorksModule,
    queryWorks,
    dataTable,
    mutationDeleteWorks,
    mutationDeleteWork,
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
      employees: paramsValues.employees.map((em: string) => ({ id: em })),
    },

    hasParamsQuery: hasValues,
    workIdDocument,
    setWorkIdDocument,
    setExecuteQuery,
    queryGetDocument,
  };

  return (
    <WorksModuleContext.Provider value={contextValue}>
      {children}
    </WorksModuleContext.Provider>
  );
};
