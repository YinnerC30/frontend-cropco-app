import { createColumnsTable } from '@/modules/core/helpers/createColumnsTable';
import { useDataTableManual } from '@/modules/core/hooks';
import { useAdvancedQueryData } from '@/modules/core/hooks/useAdvancedQueryData';
import { createContext } from 'react';
import { useWindowSize } from 'react-use';
import { useGetAllHarvests } from '../../hooks';
import { useDeleteBulkHarvests } from '../../hooks/mutations/useDeleteBulkHarvests';
import { ActionsTableHarvest } from './ActionsTableHarvest';
import columnsHarvest from './ColumnsTableHarvest';

export const HarvestsModuleContext = createContext<any>(null);

export const HarvestsModuleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { width } = useWindowSize();

  const { data } = useAdvancedQueryData({
    params: [
      'crop',

      'filter_by_date',
      'type_filter_date',
      'date',

      'filter_by_total',
      'type_filter_total',
      'total',

      'filter_by_value_pay',
      'type_filter_value_pay',
      'value_pay',
    ],
  });

  const { query, pagination, setPagination } = useGetAllHarvests({ ...data });

  const showActionsInFirstColumn = width < 1024;

  const columnsTable = createColumnsTable({
    actionsInFirstColumn: showActionsInFirstColumn,
    columns: columnsHarvest,
    actions: ActionsTableHarvest,
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
    rows: query.data?.rows ?? [],
    pagination,
    setPagination,
  });

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
    paramsQuery: {
      ...data,
      crop: { id: data.crop },
      date: !data.date ? undefined : new Date(data.date),
    },
  };

  return (
    <HarvestsModuleContext.Provider value={contextValue}>
      {children}
    </HarvestsModuleContext.Provider>
  );
};
