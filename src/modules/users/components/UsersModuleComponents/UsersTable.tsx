// path: /components/UsersModuleComponents/UsersTable.tsx
import { ScrollArea, ScrollBar } from '@/components';
import { DataTableHook } from '@/modules/core/components';
import { useUsersModuleContext } from '../UsersModuleContext';



export const UsersTable = () => {
  const { table, lengthColumns, query, hasPermission, isPending } = useUsersModuleContext();

  return (
    <ScrollArea className="w-[95%] pb-4" type="auto">
      <DataTableHook
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
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
