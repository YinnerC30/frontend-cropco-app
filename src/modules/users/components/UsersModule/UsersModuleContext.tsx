import { useAuthorization } from '@/modules/authentication/hooks';
import { useDataTable } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useContext } from 'react';
import { useWindowSize } from 'react-use';
import { useDeleteBulkUsers, useGetAllUsers } from '../../hooks';
import createColumnsTableUsers from './createColumnsTableUsers';

const UsersModuleContext = createContext<any>(null);

export const UsersModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();

  const { query, pagination, setPagination } = useGetAllUsers({
    value: value,
  });

  const { hasPermission } = useAuthorization();

  const showActionsInFirstColumn = width < 1024;

  const { table, lengthColumns, getIdsToRowsSelected, resetSelectionRows } =
    useDataTable({
      columns: createColumnsTableUsers(showActionsInFirstColumn),
      data: query.data ?? [],
      rows:
        (hasPermission('users', 'find_all_users') && query.data?.rows) ?? [],
      pagination,
      setPagination,
    });

  

  const hasSelectedRecords = getIdsToRowsSelected().length > 0;

  const { mutate, isPending } = useDeleteBulkUsers();

  const handleDeleteBulkUsers = () => {
    mutate(
      { userIds: getIdsToRowsSelected() },
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
    handleDeleteBulkUsers,
    isPending,
    pagination,
    setPagination,
  };

  return (
    <UsersModuleContext.Provider value={contextValue}>
      {children}
    </UsersModuleContext.Provider>
  );
};

export const useUsersModuleContext = () => {
  const context = useContext(UsersModuleContext);
  if (!context) {
    throw new Error(
      'useUsersModuleContext must be used within UsersModuleProvider'
    );
  }
  return context;
};
