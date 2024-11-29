import { useAuthContext } from '@/auth/hooks';
import { useDataTable } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext } from 'react';
import { useWindowSize } from 'react-use';

import { createColumnsTable } from '@/modules/core/helpers/createColumnsTable';
import { useDeleteBulkSupplies } from '../../hooks/mutations/useDeleteBulkSupplies';
import { useGetAllSupplies } from '../../hooks/queries/useGetAllSupplies';
import {
  columnsTableSupplies,
} from './columnsTableSupplies';
import { SuppliesModuleActionsTable } from './SuppliesModuleActionsTable';

export const SuppliesModuleContext = createContext<any>(null);

export const SuppliesModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();
  const showActionsInFirstColumn = width < 1024;

  const { query, pagination, setPagination } = useGetAllSupplies({
    searchParameter: value,
    allRecords: false,
  });

  const { hasPermission } = useAuthContext();

  const columnsTable = createColumnsTable({
    actionsInFirstColumn: showActionsInFirstColumn,
    columns: columnsTableSupplies,
    actions: SuppliesModuleActionsTable,
  });

  const { table, lengthColumns, getIdsToRowsSelected, resetSelectionRows } =
    useDataTable({
      columns: columnsTable,
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
