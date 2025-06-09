import {
  DataTableTemplate
} from '@/modules/core/components';
import { SelectedMassUnitOfMeasure } from '@/modules/core/components/shared/SelectedMassUnitOfMeasure';
import { useCropsModuleContext } from '../../hooks';

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
    <DataTableTemplate
      errorMessage={
        !actionsCropsModule['find_all_crops']
          ? 'No tienes permiso para ver el listado de cultivos 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!actionsCropsModule['find_one_crop']}
      table={dataTable.table}
      lengthColumns={dataTable.lengthColumns}
      rowCount={queryCrops.data?.total_row_count ?? 0}
      isLoading={
        queryCrops.isLoading ||
        queryCrops.isRefetching ||
        mutationDeleteCrops.isPending ||
        mutationDeleteCrop.isPending
      }
    >
      <div className="flex items-center justify-end gap-2 pb-2">
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
    </DataTableTemplate>
  );
};
