import { DataTableTemplate } from '@/modules/core/components';
import { useShoppingModuleContext } from '../../hooks/context/useShoppingModuleContext';

export const ShoppingModuleTable: React.FC = () => {
  const {
    dataTable: { table, lengthColumns },
    actionsShoppingModule,
    queryShopping,
    mutationDeleteShopping,
    mutationDeleteOneShopping,
  } = useShoppingModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !actionsShoppingModule['find_all_supplies_shopping']
          ? 'No tienes permiso para ver el listado de las compras 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!actionsShoppingModule['find_one_supplies_shopping']}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={queryShopping?.data?.total_row_count ?? 0}
      isLoading={
        queryShopping.isLoading ||
        queryShopping.isRefetching ||
        mutationDeleteShopping.isPending ||
        mutationDeleteOneShopping.isPending
      }
    />
  );
};
