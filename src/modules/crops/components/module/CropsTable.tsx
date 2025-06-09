import {
  DataTable,
  DataTableButtonsPagination,
  DataTablePageCount,
  DataTableProvider,
  DataTableRowCount,
  DataTableRowSelection,
  DataTableSelectPageSize,
} from '@/modules/core/components';
import { useCropsModuleContext } from '../../hooks';
import { SelectedMassUnitOfMeasure } from '@/modules/core/components/shared/SelectedMassUnitOfMeasure';

export const CropsTable: React.FC = () => {
  const {
    dataTable,
    queryCrops,
    mutationDeleteCrops,
    actionsCropsModule,
    mutationDeleteCrop,
    unitTypeToShowAmount,
    setUnitTypeToShowAmount,
  } = useCropsModuleContext();

  return (
    <DataTableProvider
      table={dataTable.table}
      disabledDoubleClick={!actionsCropsModule['find_one_crop']}
      errorMessage={
        !actionsCropsModule['find_all_crops']
          ? 'No tienes permiso para ver el listado de cultivos 😢'
          : 'No hay registros.'
      }
      lengthColumns={dataTable.lengthColumns}
      rowCount={queryCrops.data?.total_row_count ?? 0}
      isLoading={
        queryCrops.isLoading ||
        queryCrops.isRefetching ||
        mutationDeleteCrops.isPending ||
        mutationDeleteCrop.isPending
      }
    >
      <div className="flex flex-col w-full my-1">
        <div className="flex justify-between my-2">
          <div className="flex flex-col gap-2">
            <DataTableRowCount />
            <DataTableRowSelection />
          </div>
          <DataTableSelectPageSize />
        </div>
        {/* Convertor Units */}
        <div className="flex items-center justify-end gap-2 py-2">
          <p className="text-sm font-medium text-muted-foreground">
            Mostrar inventario como:
          </p>
          <div className="font-medium">
            {' '}
            <SelectedMassUnitOfMeasure
              onChange={setUnitTypeToShowAmount}
              valueSelect={unitTypeToShowAmount}
            />
          </div>
        </div>
        <DataTable />
        <DataTableButtonsPagination />
        <DataTablePageCount />
      </div>
    </DataTableProvider>
  );
};
