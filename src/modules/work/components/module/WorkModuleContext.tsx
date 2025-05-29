import { useAuthContext } from '@/auth';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { createContext, useEffect, useMemo, useState } from 'react';

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
import { useGetAllCropsWithWork } from '@/modules/crops/hooks';
import { useGetAllEmployeesWithWorks } from '@/modules/payments/hooks/queries/useGetAllEmployeesWithWorks';
import { Crop } from '@/modules/crops/interfaces/Crop';
import { Employee } from '@/modules/employees/interfaces/Employee';

export interface paramQueryWork {
  crop: { id: string };
  employees: { id: string }[];
  filter_by_date: {
    type_filter_date: string | undefined;
    date: string | undefined | Date;
  };
  filter_by_value_pay: {
    type_filter_value_pay: string | undefined;
    value_pay: number;
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
  queryCrops: UseQueryGetAllRecordsReturn<Crop>;
  queryEmployees: UseQueryGetAllRecordsReturn<Employee>;
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

  const queryCrops = useGetAllCropsWithWork();

  const queryEmployees = useGetAllEmployeesWithWorks();

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
          pageCount: queryWorks.data?.total_page_count ?? 0,
          rowCount: queryWorks.data?.total_row_count ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: queryWorks.data?.records ?? [],
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
    actionPDF: 'DownloadPDF',
    actionOnSuccess: () => {
      setExecuteQuery(false);
      setWorkIdDocument('');
    },
  });

  useEffect(() => {
    if (hasValues) {
      setPagination({ pageIndex: 0, pageSize: 10 });
    }
  }, [hasValues]);

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
      filter_by_value_pay: {
        type_filter_value_pay: paramsValues.type_filter_value_pay,
        value_pay: paramsValues.value_pay,
      },
      employees: paramsValues.employees.map((em: string) => ({ id: em })),
    },

    hasParamsQuery: hasValues,
    workIdDocument,
    setWorkIdDocument,
    setExecuteQuery,
    queryGetDocument,
    queryCrops,
    queryEmployees,
  };

  return (
    <WorksModuleContext.Provider value={contextValue}>
      {children}
    </WorksModuleContext.Provider>
  );
};
