import { DataTableTemplate } from '@/modules/core/components';
import { useShoppingModuleContext } from '../../hooks/context/useShoppingModuleContext';

export const ShoppingModuleTable = () => {
  const { table, lengthColumns, query, permissionsShopping } =
    useShoppingModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !permissionsShopping['find_all_supplies_shopping']
          ? 'No tienes permiso para ver el listado de las compras 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!permissionsShopping['find_one_supplies_shopping']}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={query?.data?.rowCount ?? 0}
      isLoading={query.isLoading || query.isRefetching}
    />
  );
};
