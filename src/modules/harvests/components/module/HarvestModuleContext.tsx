import { useDataTableManual } from '@/modules/core/hooks';
import { createContext } from 'react';
import { useGetAllHarvests } from '../../hooks';
import { createColumnsTable } from '@/modules/core/helpers/createColumnsTable';
import { useWindowSize } from 'react-use';
import columnsHarvest from './ColumnsTableHarvest';
import { ActionsTableHarvest } from './ActionsTableHarvest';
import { useDeleteBulkHarvests } from '../../hooks/mutations/useDeleteBulkHarvests';

export const HarvestsModuleContext = createContext<any>(null);

export const HarvestsModuleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { width } = useWindowSize();
  const { query, pagination, setPagination } = useGetAllHarvests({
    searchParameter: '',
  });

  const showActionsInFirstColumn = width < 1024;

  const columnsTable = createColumnsTable({
    actionsInFirstColumn: showActionsInFirstColumn,
    columns: columnsHarvest,
    actions: ActionsTableHarvest,
  });

  const { table, lengthColumns, getIdsToRowsSelected, resetSelectionRows } =
    useDataTableManual({
      columns: columnsTable,
      data: query.data ?? [],
      rows: query.data?.rows ?? [],
      pagination,
      setPagination,
    });

  const hasSelectedRecords = getIdsToRowsSelected().length > 0;

  const { mutate, isPending } = useDeleteBulkHarvests();

  const handleDeleteBulkHarvests = () => {
    mutate(
      { harvestIds: getIdsToRowsSelected() },
      {
        onSuccess: () => {
          resetSelectionRows();
        },
      }
    );
  };

  const contextValue = {
    query,
    table,
    lengthColumns,
    getIdsToRowsSelected,
    resetSelectionRows,
    hasSelectedRecords,
    isPending,
    handleDeleteBulkHarvests,
  };

  return (
    <HarvestsModuleContext.Provider value={contextValue}>
      {children}
    </HarvestsModuleContext.Provider>
  );
};
