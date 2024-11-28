import { useAuthContext } from '@/modules/authentication/hooks';
import { useDataTable } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useContext } from 'react';
import { useWindowSize } from 'react-use';

import { useGetAllSupplies } from '../../hooks/queries/useGetAllSupplies';
import createColumnsTableSupplies from './createColumnsTableSupplies';
import { useDeleteBulkSupplies } from '../../hooks/mutations/useDeleteBulkSupplies';

const SuppliesModuleContext = createContext<any>(null);

export const SuppliesModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();
  const showActionsInFirstColumn = width < 1024;

  const { query, pagination, setPagination } = useGetAllSupplies({
    searchParameter: value,
    allRecords: false,
  });

  const { hasPermission } = useAuthContext();

  const { table, lengthColumns, getIdsToRowsSelected, resetSelectionRows } =
    useDataTable({
      columns: createColumnsTableSupplies(showActionsInFirstColumn),
      data: query.data ?? [],
      rows:
        (hasPermission('supplies', 'find_all_supplies') && query.data?.rows) ??
        [],
      pagination,
      setPagination,
    });

  const hasSelectedRecords = getIdsToRowsSelected().length > 0;

  const { mutate, isPending } = useDeleteBulkSupplies();

  const handleDeleteBulkSupplies = () => {
    mutate(
      { suppliesIds: getIdsToRowsSelected() },
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
    handleDeleteBulkSupplies,
    isPending,
  };

  return (
    <SuppliesModuleContext.Provider value={contextValue}>
      {children}
    </SuppliesModuleContext.Provider>
  );
};

export const useSuppliesModuleContext = () => {
  const context = useContext(SuppliesModuleContext);
  if (!context) {
    throw new Error(
      'useSuppliesModuleContext must be used within SuppliesModuleProvider'
    );
  }
  return context;
};
