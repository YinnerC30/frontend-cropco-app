import { DataTableTemplate } from '@/modules/core/components';
import { useSaleModuleContext } from '../../hooks/context/useSaleModuleContext';

export const SaleModuleTable = () => {
  const { table, lengthColumns, query, permissionsSale } =
    useSaleModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !permissionsSale['find_all_sales']
          ? 'No tienes permiso para ver el listado de las ventas 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!permissionsSale['find_one_sale']}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={query?.data?.rowCount ?? 0}
      isLoading={query.isLoading || query.isRefetching}
    />
  );
};
