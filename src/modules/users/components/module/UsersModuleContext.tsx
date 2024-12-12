import { useAuthContext } from '@/auth/hooks';
import { useDataTableManual } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { createContext } from 'react';
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

  const { query, pagination, setPagination } = useGetAllUsers({
    value: value,
  });

  const { hasPermission } = useAuthContext();

  const columnsTable = useCreateColumnsTable({
    columns: columnsTableUsers,
    actions: UsersModuleActionsTable,
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
    rows: (hasPermission('users', 'find_all_users') && query.data?.rows) ?? [],
    pagination,
    setPagination,
  });

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
