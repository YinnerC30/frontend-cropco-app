import { DataTableTemplate } from '@/modules/core/components';
import { useSaleModuleContext } from '../../hooks/context/useSaleModuleContext';

export const SaleModuleTable = () => {
  const {
    dataTable: { table, lengthColumns },
    querySales,
    actionsSalesModule,
    mutationDeleteSales,
  } = useSaleModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !actionsSalesModule['find_all_sales']
          ? 'No tienes permiso para ver el listado de las ventas 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!actionsSalesModule['find_one_sale']}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={querySales?.data?.rowCount ?? 0}
      isLoading={
        querySales.isLoading ||
        querySales.isRefetching ||
        mutationDeleteSales.isPending
      }
    />
  );
};
