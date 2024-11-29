import { useAuthContext } from '@/auth/hooks';
import { useDataTable } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useContext } from 'react';
import { useWindowSize } from 'react-use';
import { useGetAllCrops } from '../../hooks/queries/useGetAllCrops';

import { createColumnsTable } from '@/modules/core/helpers/createColumnsTable';
import { useDeleteBulkCrops } from '../../hooks/mutations/useDeleteBulkCrops';
import { columnsTableCrops } from './columnsTableCrops';
import { CropsModuleActionsTable } from './CropsModuleActionsTable';

export const CropsModuleContext = createContext<any>(null);

export const CropsModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();
  const showActionsInFirstColumn = width < 1024;

  const { query, pagination, setPagination } = useGetAllCrops({
    searchParameter: value,
    allRecords: false,
  });

  const { hasPermission } = useAuthContext();

  const columnsTable = createColumnsTable({
    actionsInFirstColumn: showActionsInFirstColumn,
    columns: columnsTableCrops,
    actions: CropsModuleActionsTable,
  });

  const { table, lengthColumns, getIdsToRowsSelected, resetSelectionRows } =
    useDataTable({
      columns: columnsTable,
      data: query.data ?? [],
      rows:
        (hasPermission('crops', 'find_all_crops') && query.data?.rows) ?? [],
      pagination,
      setPagination,
    });

  const hasSelectedRecords = getIdsToRowsSelected().length > 0;

  const { mutate, isPending } = useDeleteBulkCrops();

  const handleDeleteBulkCrops = () => {
    mutate(
      { cropsIds: getIdsToRowsSelected() },
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
    handleDeleteBulkCrops,
    isPending,
  };

  return (
    <CropsModuleContext.Provider value={contextValue}>
      {children}
    </CropsModuleContext.Provider>
  );
};


