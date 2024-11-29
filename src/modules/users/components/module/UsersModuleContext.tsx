import { useAuthContext } from '@/auth/hooks';
import { createColumnsTable } from '@/modules/core/helpers/createColumnsTable';
import { useDataTable } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext } from 'react';
import { useWindowSize } from 'react-use';
import { useDeleteBulkUsers, useGetAllUsers } from '../../hooks';
import { columnsTableUsers } from './columnsTableUsers';
import { UsersModuleActionsTable } from './UsersModuleActionsTable';

export const UsersModuleContext = createContext<any>(null);

export const UsersModuleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();

  const { query, pagination, setPagination } = useGetAllUsers({
    value: value,
  });

  const { hasPermission } = useAuthContext();

  const showActionsInFirstColumn = width < 1024;

  const columnsTable = createColumnsTable({
    actionsInFirstColumn: showActionsInFirstColumn,
    columns: columnsTableUsers,
    actions: UsersModuleActionsTable,
  });

  const { table, lengthColumns, getIdsToRowsSelected, resetSelectionRows } =
    useDataTable({
      columns: columnsTable,
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
