import { useAuthContext } from '@/auth/hooks';
import { useDataTableManual } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext } from 'react';
import { useGetAllCrops } from '../../hooks/queries/useGetAllCrops';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useDeleteBulkCrops } from '../../hooks/mutations/useDeleteBulkCrops';
import { columnsTableCrops } from './columnsTableCrops';
import { CropsModuleActionsTable } from './CropsModuleActionsTable';

export const CropsModuleContext = createContext<any>(null);

export const CropsModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();

  const { query, pagination, setPagination } = useGetAllCrops({
    searchParameter: value,
    allRecords: false,
  });

  const { hasPermission } = useAuthContext();

  const columnsTable = useCreateColumnsTable({
    columns: columnsTableCrops,
    actions: CropsModuleActionsTable,
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
    rows: (hasPermission('crops', 'find_all_crops') && query.data?.rows) ?? [],
    pagination,
    setPagination,
  });

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
