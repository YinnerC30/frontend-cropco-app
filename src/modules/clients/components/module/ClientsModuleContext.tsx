import { useAuthContext } from '@/auth/hooks';
import { useDataTable } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext } from 'react';
import { useWindowSize } from 'react-use';

import { createColumnsTable } from '@/modules/core/helpers/createColumnsTable';
import { useDeleteBulkClients } from '../../hooks/mutations/useDeleteBulkClients';
import { useGetAllClients } from '../../hooks/queries/useGetAllClients';
import { ClientsModuleActionsTable } from './ClientsModuleActionsTable';
import { columnsTableClients } from './columnsTableClients';

export const ClientsModuleContext = createContext<any>(null);

export const ClientsModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();
  const showActionsInFirstColumn = width < 1024;

  const { query, pagination, setPagination } = useGetAllClients(value);

  const { hasPermission } = useAuthContext();

  const columnsTable = createColumnsTable({
    actionsInFirstColumn: showActionsInFirstColumn,
    columns: columnsTableClients,
    actions: ClientsModuleActionsTable,
  });

  const { table, lengthColumns, getIdsToRowsSelected, resetSelectionRows } =
    useDataTable({
      columns: columnsTable,
      data: query.data ?? [],
      rows:
        (hasPermission('clients', 'find_all_clients') && query.data?.rows) ??
        [],
      pagination,
      setPagination,
    });

  const hasSelectedRecords = getIdsToRowsSelected().length > 0;

  const { mutate, isPending } = useDeleteBulkClients();

  const handleDeleteBulkClients = () => {
    mutate(
      { clientsIds: getIdsToRowsSelected() },
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
    handleDeleteBulkClients,
    isPending,
  };

  return (
    <ClientsModuleContext.Provider value={contextValue}>
      {children}
    </ClientsModuleContext.Provider>
  );
};
