import { useAuthorizationContext } from '@/modules/authentication/hooks';
import { useDataTable } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useContext } from 'react';
import { useWindowSize } from 'react-use';
import { useGetAllCrops } from '../../hooks/queries/useGetAllCrops';
import createColumnsTableCrops from './createColumnsTableCrops';
import { useDeleteBulkCrops } from '../../hooks/mutations/useDeleteBulkCrops';

const CropsModuleContext = createContext<any>(null);

export const CropsModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();
  const showActionsInFirstColumn = width < 1024;

  const { query, pagination, setPagination } = useGetAllCrops({
    searchParameter: value,
    allRecords: false,
  });

  const { hasPermission } = useAuthorizationContext();

  const { table, lengthColumns, getIdsToRowsSelected, resetSelectionRows } =
    useDataTable({
      columns: createColumnsTableCrops(showActionsInFirstColumn),
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

export const useCropsModuleContext = () => {
  const context = useContext(CropsModuleContext);
  if (!context) {
    throw new Error(
      'useCropsModuleContext must be used within CropsModuleProvider'
    );
  }
  return context;
};
