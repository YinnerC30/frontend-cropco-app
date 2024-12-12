import { useAuthContext } from '@/auth/hooks/index.ts';
import { useDataTableManual } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext } from 'react';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable.ts';
import { useDeleteBulkSuppliers } from '../../hooks/mutations/useDeleteBulkSuppliers.ts';
import { useGetAllSuppliers } from '../../hooks/queries/useGetAllSuppliers';
import { columnsTableSuppliers } from './columnsTableSuppliers.tsx';
import { SuppliersModuleActionsTable } from './SuppliersModuleActionsTable.tsx';

export const SuppliersModuleContext = createContext<any>(null);

export const SuppliersModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();

  const { query, pagination, setPagination } = useGetAllSuppliers(value);

  const { hasPermission } = useAuthContext();

  const columnsTable = useCreateColumnsTable({
    columns: columnsTableSuppliers,
    actions: SuppliersModuleActionsTable,
  });
  const {
    table,
    lengthColumns,
    getIdsToRowsSelected,
    resetSelectionRows,
    hasSelectedRecords,
  } = useDataTableManual({
    columns: columnsTable,
    data: query.data ?? [],
    rows:
      (hasPermission('suppliers', 'find_all_suppliers') && query.data?.rows) ??
      [],
    pagination,
    setPagination,
  });

  const { mutate, isPending } = useDeleteBulkSuppliers();

  const handleDeleteBulkSuppliers = () => {
    mutate(
      { suppliersIds: getIdsToRowsSelected() },
      {
        onSuccess: () => {
          resetSelectionRows();
        },
      }
    );
  };

  const contextValue = {
    value,
    query,
    hasPermission,
    table,
    lengthColumns,
    hasSelectedRecords,
    resetSelectionRows,
    pagination,
    setPagination,
    handleDeleteBulkSuppliers,
    isPending,
  };

  return (
    <SuppliersModuleContext.Provider value={contextValue}>
      {children}
    </SuppliersModuleContext.Provider>
  );
};
