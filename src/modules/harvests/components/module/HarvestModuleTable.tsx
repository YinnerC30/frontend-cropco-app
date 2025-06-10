import { DataTableTemplate } from '@/modules/core/components';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';
import { SelectedMassUnitOfMeasure } from '@/modules/core/components/shared/SelectedMassUnitOfMeasure';

export const HarvestModuleTable: React.FC = () => {
  const {
    queryHarvests,
    actionsHarvestsModule,
    dataTable,
    mutationDeleteHarvests,
    mutationDeleteHarvest,
    unitTypeToShowAmount,
    setUnitTypeToShowAmount,
  } = useHarvestModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !actionsHarvestsModule['find_all_harvests']
          ? 'No tienes permiso para ver el listado de las cosechas 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!actionsHarvestsModule['find_one_harvest']}
      table={dataTable.table}
      lengthColumns={dataTable.lengthColumns}
      rowCount={queryHarvests?.data?.total_row_count ?? 0}
      isLoading={
        queryHarvests.isLoading ||
        queryHarvests.isRefetching ||
        mutationDeleteHarvests.isPending ||
        mutationDeleteHarvest.isPending
      }
    >
      <div className="flex items-center justify-end gap-2 pb-2">
        <p className="text-sm font-medium text-muted-foreground">
          Mostrar cantidad cosechada como:
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
