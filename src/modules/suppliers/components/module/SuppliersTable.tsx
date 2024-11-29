import { DataTableTemplate } from '@/modules/core/components';
import { useSuppliersModuleContext } from '../../hooks';

export const SuppliersTable = () => {
  const { table, lengthColumns, query, hasPermission, isPending } =
    useSuppliersModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !hasPermission('suppliers', 'find_all_suppliers')
          ? 'No tienes permiso para ver el listado de proveedores 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!hasPermission('suppliers', 'find_one_supplier')}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={query.data?.rowCount ?? 0}
      isLoading={query.isLoading || query.isRefetching || isPending}
    />
  );
};
