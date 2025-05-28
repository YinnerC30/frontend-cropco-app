import { useAuthContext } from '@/auth/hooks/index.ts';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useEffect, useMemo } from 'react';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable.ts';
import { BulkRecords } from '@/modules/core/interfaces/index.ts';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn.ts';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn.ts';
import { useDeleteSupplier } from '../../hooks/index.ts';
import { useDeleteBulkSuppliers } from '../../hooks/mutations/useDeleteBulkSuppliers.ts';
import { useGetAllSuppliers } from '../../hooks/queries/useGetAllSuppliers';
import { Supplier } from '../../interfaces/Supplier.ts';
import { columnsTableSuppliers } from './columnsTableSuppliers.tsx';
import { SuppliersModuleActionsTable } from './SuppliersModuleActionsTable.tsx';

export interface SuppliersModuleContextProps {
  paramQuery: string;
  querySuppliers: UseQueryGetAllRecordsReturn<Supplier>;
  dataTable: DataTableManualReturn<Supplier>;
  mutationDeleteSuppliers: UseMutationReturn<void, BulkRecords>;
  mutationDeleteSupplier: UseMutationReturn<void, string>;
  actionsSuppliersModule: Record<string, boolean>;
}

export const SuppliersModuleContext = createContext<
  SuppliersModuleContextProps | undefined
>(undefined);

export const SuppliersModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { value } = useBasicQueryData();

  const {
    query: querySuppliers,
    pagination,
    setPagination,
  } = useGetAllSuppliers({
    queryValue: value,
  });

  const { getActionsModule } = useAuthContext();
  const actionsSuppliersModule = useMemo(
    () => getActionsModule('suppliers'),
    []
  );

  const columnsTable = useCreateColumnsTable<Supplier>({
    columns: columnsTableSuppliers,
    actions: SuppliersModuleActionsTable,
  });
  const dataTable = useDataTableManual<Supplier>({
    columns: columnsTable,
    infoPagination: querySuppliers.isSuccess
      ? {
          pageCount: querySuppliers.data?.total_page_count ?? 0,
          rowCount: querySuppliers.data?.total_row_count ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: querySuppliers.data?.records ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteSuppliers = useDeleteBulkSuppliers();
  const mutationDeleteSupplier = useDeleteSupplier();

  useEffect(() => {
    if (value.length > 0) {
      setPagination({ pageIndex: 0, pageSize: 10 });
    }
  }, [value]);

  const contextValue: SuppliersModuleContextProps = {
    paramQuery: value,
    querySuppliers,
    dataTable,
    mutationDeleteSuppliers,
    mutationDeleteSupplier,
    actionsSuppliersModule,
  };

  return (
    <SuppliersModuleContext.Provider value={contextValue}>
      {children}
    </SuppliersModuleContext.Provider>
  );
};
