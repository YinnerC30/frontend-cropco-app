import { useAuthContext } from '@/auth/hooks';
import { useDataTableManual } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import React, { createContext, useMemo } from 'react';
import { useDeleteBulkUsers, useGetAllUsers } from '../../hooks';
import { UsersModuleContextProps } from '../../interfaces/';
import { columnsTableUsers } from './columnsTableUsers';
import { UsersModuleActionsTable } from './UsersModuleActionsTable';

export const UsersModuleContext = createContext<
  UsersModuleContextProps | undefined
>(undefined);

export const UsersModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { value } = useBasicQueryData();

  const {
    query: queryUsers,
    pagination,
    setPagination,
  } = useGetAllUsers({
    value: value,
  });

  const { getActionsModule } = useAuthContext();

  const actionsUsersModule = useMemo(() => getActionsModule('users'), []);

  const columnsTable = useCreateColumnsTable({
    columns: columnsTableUsers,
    actions: UsersModuleActionsTable,
  });

  const dataTable = useDataTableManual({
    columns: columnsTable,
    infoPagination: queryUsers.data ?? { pageCount: 0, rowCount: 0 },
    rows: queryUsers.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteUsers = useDeleteBulkUsers();

  const handleDeleteBulkUsers = (): void => {
    mutationDeleteUsers.mutate(
      { userIds: dataTable.getIdsToRowsSelected() },
      {
        onSuccess: () => {
          dataTable.resetSelectionRows();
        },
      }
    );
  };

  const contextValue = {
    value,
    queryUsers,
    dataTable,
    handleDeleteBulkUsers,
    mutationDeleteUsers,
    actionsUsersModule,
    paramQuery: value,
  };

  return (
    <UsersModuleContext.Provider value={contextValue}>
      {children}
    </UsersModuleContext.Provider>
  );
};
