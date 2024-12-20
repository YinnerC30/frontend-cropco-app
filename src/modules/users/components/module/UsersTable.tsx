import { DataTableTemplate } from '@/modules/core/components';
import { useUsersModuleContext } from '../../hooks';

export const UsersTable = () => {
  const { dataTable, queryUsers, actionsUsersModule, mutationDeleteUsers } =
    useUsersModuleContext();

  const { table, lengthColumns } = dataTable;

  return (
    <DataTableTemplate
      errorMessage={
        !actionsUsersModule['find_all_users']
          ? 'No tienes permiso para ver el listado de usuarios 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!actionsUsersModule['find_one_user']}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={queryUsers.data?.rowCount ?? 0}
      isLoading={
        queryUsers.isLoading ||
        queryUsers.isRefetching ||
        mutationDeleteUsers.isPending
      }
    />
  );
};
