import { DataTableTemplate } from '@/modules/core/components';
import { useSaleModuleContext } from '../../hooks/context/useSaleModuleContext';
import { SelectedMassUnitOfMeasure } from '@/modules/core/components/shared/SelectedMassUnitOfMeasure';

export const SaleModuleTable = () => {
  const {
    dataTable: { table, lengthColumns },
    querySales,
    actionsSalesModule,
    mutationDeleteSales,
    mutationDeleteSale,
    unitTypeToShowAmount,
    setUnitTypeToShowAmount,
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
      rowCount={querySales?.data?.total_row_count ?? 0}
      isLoading={
        querySales.isLoading ||
        querySales.isRefetching ||
        mutationDeleteSales.isPending ||
        mutationDeleteSale.isPending
      }
    >
      <div className="flex items-center justify-end gap-2 pb-2">
        <p className="text-sm font-medium text-muted-foreground">
          Mostrar cantidad vendida como:
        </p>
        <div className="font-medium">
          {' '}
          <SelectedMassUnitOfMeasure
            onChange={setUnitTypeToShowAmount}
            valueSelect={unitTypeToShowAmount}
          />
        </div>
      </div>
    </DataTableTemplate>
  );
};
