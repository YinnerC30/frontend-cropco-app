import { DataTableTemplate } from '@/modules/core/components';
import { useClientsModuleContext } from './ClientsModuleContext';

export const ClientsTable = () => {
  const { table, lengthColumns, query, hasPermission, isPending } =
    useClientsModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !hasPermission('clients', 'find_all_clients')
          ? 'No tienes permiso para ver el listado de empleados 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!hasPermission('clients', 'find_one_client')}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={query.data?.rowCount ?? 0}
      isLoading={query.isLoading || query.isRefetching || isPending}
    />
  );
};
