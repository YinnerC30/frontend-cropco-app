import { useAuthContext } from '@/auth/hooks';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useMemo } from 'react';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { BulkRecords } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useDeleteSupply } from '../../hooks';
import { useDeleteBulkSupplies } from '../../hooks/mutations/useDeleteBulkSupplies';
import { useGetAllSupplies } from '../../hooks/queries/useGetAllSupplies';
import { Supply } from '../../interfaces/Supply';
import { columnsTableSupplies } from './columnsTableSupplies';
import { SuppliesModuleActionsTable } from './SuppliesModuleActionsTable';

export interface SuppliesModuleContextProps {
  paramQuery: string;
  querySupplies: UseQueryGetAllRecordsReturn<Supply>;
  dataTable: DataTableManualReturn<Supply>;
  mutationDeleteSupplies: UseMutationReturn<void, BulkRecords>;
  mutationDeleteSupply: UseMutationReturn<void, string>;
  actionsSuppliesModule: Record<string, boolean>;
}

export const SuppliesModuleContext = createContext<
  SuppliesModuleContextProps | undefined
>(undefined);

export const SuppliesModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();

  const {
    query: querySupplies,
    pagination,
    setPagination,
  } = useGetAllSupplies({
    queryValue: value,
    allRecords: false,
  });

  const { getActionsModule } = useAuthContext();

  const actionsSuppliesModule = useMemo(() => getActionsModule('supplies'), []);

  const columnsTable = useCreateColumnsTable<Supply>({
    columns: columnsTableSupplies,
    actions: SuppliesModuleActionsTable,
  });

  const dataTable = useDataTableManual<Supply>({
    columns: columnsTable,
    infoPagination: querySupplies.isSuccess
      ? {
          pageCount: querySupplies.data?.pageCount ?? 0,
          rowCount: querySupplies.data?.rowCount ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: querySupplies.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteSupplies = useDeleteBulkSupplies();
  const mutationDeleteSupply = useDeleteSupply();

  const contextValue: SuppliesModuleContextProps = {
    paramQuery: value,
    querySupplies,
    mutationDeleteSupplies,
    mutationDeleteSupply,
    actionsSuppliesModule,
    dataTable,
  };

  return (
    <SuppliesModuleContext.Provider value={contextValue}>
      {children}
    </SuppliesModuleContext.Provider>
  );
};
