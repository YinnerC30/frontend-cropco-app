import { DataTableTemplate } from '@/modules/core/components';
import { useSuppliesModuleContext } from './SuppliesModuleContext';

export const SuppliesTable = () => {
  const { table, lengthColumns, query, hasPermission, isPending } =
    useSuppliesModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !hasPermission('supplies', 'find_all_supplies')
          ? 'No tienes permiso para ver el listado de suministros 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!hasPermission('supplies', 'find_one_supply')}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={query.data?.rowCount ?? 0}
      isLoading={query.isLoading || query.isRefetching || isPending}
    />
  );
};
