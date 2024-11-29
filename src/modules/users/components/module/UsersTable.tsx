import { DataTableTemplate } from '@/modules/core/components';
import { useUsersModuleContext } from '../../hooks';

export const UsersTable = () => {
  const { table, lengthColumns, query, hasPermission, isPending } =
    useUsersModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !hasPermission('users', 'find_all_users')
          ? 'No tienes permiso para ver el listado de usuarios 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!hasPermission('users', 'find_one_user')}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={query.data?.rowCount ?? 0}
      isLoading={query.isLoading || query.isRefetching || isPending}
    />
  );
};
