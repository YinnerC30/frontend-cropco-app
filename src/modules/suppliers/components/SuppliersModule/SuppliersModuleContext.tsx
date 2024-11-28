import { useAuthorizationContext } from '@/modules/authentication/hooks';
import { useDataTable } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useContext } from 'react';
import { useWindowSize } from 'react-use';

import { useGetAllSuppliers } from '../../hooks/queries/useGetAllSuppliers';
import createColumnsTableSuppliers from './createColumnsTableSuppliers';
import { useDeleteBulkSuppliers } from '../../hooks/mutations/useDeleteBulkSuppliers.ts';

const SuppliersModuleContext = createContext<any>(null);

export const SuppliersModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();
  const showActionsInFirstColumn = width < 1024;

  const { query, pagination, setPagination } = useGetAllSuppliers(value);

  const { hasPermission } = useAuthorizationContext();

  const { table, lengthColumns, getIdsToRowsSelected, resetSelectionRows } =
    useDataTable({
      columns: createColumnsTableSuppliers(showActionsInFirstColumn),
      data: query.data ?? [],
      rows:
        (hasPermission('suppliers', 'find_all_suppliers') &&
          query.data?.rows) ??
        [],
      pagination,
      setPagination,
    });

  const hasSelectedRecords = getIdsToRowsSelected().length > 0;

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
    showActionsInFirstColumn,
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

export const useSuppliersModuleContext = () => {
  const context = useContext(SuppliersModuleContext);
  if (!context) {
    throw new Error(
      'useSuppliersModuleContext must be used within SuppliersModuleProvider'
    );
  }
  return context;
};
