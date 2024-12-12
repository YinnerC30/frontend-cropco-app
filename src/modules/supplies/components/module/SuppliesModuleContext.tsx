import { useAuthContext } from '@/auth/hooks';
import { useDataTableManual } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext } from 'react';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useDeleteBulkSupplies } from '../../hooks/mutations/useDeleteBulkSupplies';
import { useGetAllSupplies } from '../../hooks/queries/useGetAllSupplies';
import { columnsTableSupplies } from './columnsTableSupplies';
import { SuppliesModuleActionsTable } from './SuppliesModuleActionsTable';

export const SuppliesModuleContext = createContext<any>(null);

export const SuppliesModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();

  const { query, pagination, setPagination } = useGetAllSupplies({
    searchParameter: value,
    allRecords: false,
  });

  const { hasPermission } = useAuthContext();

  const columnsTable = useCreateColumnsTable({
    columns: columnsTableSupplies,
    actions: SuppliesModuleActionsTable,
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
      (hasPermission('supplies', 'find_all_supplies') && query.data?.rows) ??
      [],
    pagination,
    setPagination,
  });

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
