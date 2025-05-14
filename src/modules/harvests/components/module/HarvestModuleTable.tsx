import { DataTableTemplate } from '@/modules/core/components';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';

export const HarvestModuleTable: React.FC = () => {
  const {
    queryHarvests,
    actionsHarvestsModule,
    dataTable,
    mutationDeleteHarvests,
    mutationDeleteHarvest,
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
    />
  );
};
