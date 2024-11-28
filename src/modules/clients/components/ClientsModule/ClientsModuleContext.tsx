import { useAuthorizationContext } from '@/modules/authentication/hooks';
import { useDataTable } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useContext } from 'react';
import { useWindowSize } from 'react-use';

import { useGetAllClients } from '../../hooks/queries/useGetAllClients';
import createColumnsTableClients from './createColumnsTableClients';
import { useDeleteBulkClients } from '../../hooks/mutations/useDeleteBulkClients';

const ClientsModuleContext = createContext<any>(null);

export const ClientsModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();
  const showActionsInFirstColumn = width < 1024;

  const { query, pagination, setPagination } = useGetAllClients(value);

  const { hasPermission } = useAuthorizationContext();

  const { table, lengthColumns, getIdsToRowsSelected, resetSelectionRows } =
    useDataTable({
      columns: createColumnsTableClients(showActionsInFirstColumn),
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

export const useClientsModuleContext = () => {
  const context = useContext(ClientsModuleContext);
  if (!context) {
    throw new Error(
      'useClientsModuleContext must be used within ClientsModuleProvider'
    );
  }
  return context;
};
