import { useAuthContext } from '@/auth/hooks';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useMemo } from 'react';
import { useGetAllCrops } from '../../hooks/queries/useGetAllCrops';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useDeleteBulkCrops } from '../../hooks/mutations/useDeleteBulkCrops';
import { columnsTableCrops } from './columnsTableCrops';
import { CropsModuleActionsTable } from './CropsModuleActionsTable';
import { Crop } from '../../interfaces/Crop';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { BulkRecords } from '@/modules/core/interfaces';

export interface CropsModuleContextProps {
  paramQuery: string;
  queryCrops: UseQueryGetAllRecordsReturn<Crop>;
  dataTable: DataTableManualReturn<Crop>;
  mutationDeleteCrops: UseMutationReturn<void, BulkRecords>;
  actionsCropsModule: Record<string, boolean>;
}

export const CropsModuleContext = createContext<
  CropsModuleContextProps | undefined
>(undefined);

export const CropsModuleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { value } = useBasicQueryData();

  const {
    query: queryCrops,
    pagination,
    setPagination,
  } = useGetAllCrops({
    queryValue: value,
    allRecords: false,
  });

  const { getActionsModule } = useAuthContext();

  const actionsCropsModule = useMemo(() => getActionsModule('crops'), []);

  const columnsTable = useCreateColumnsTable<Crop>({
    columns: columnsTableCrops,
    actions: CropsModuleActionsTable,
  });

  const dataTable = useDataTableManual<Crop>({
    columns: columnsTable,
    infoPagination: queryCrops.isSuccess
      ? {
          pageCount: queryCrops.data?.pageCount ?? 0,
          rowCount: queryCrops.data?.rowCount ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },

    rows: queryCrops.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteCrops = useDeleteBulkCrops();

  const contextValue: CropsModuleContextProps = {
    paramQuery: value,
    queryCrops,
    dataTable,
    actionsCropsModule,
    mutationDeleteCrops,
  };

  return (
    <CropsModuleContext.Provider value={contextValue}>
      {children}
    </CropsModuleContext.Provider>
  );
};
