import { DataTableTemplate } from '@/modules/core/components';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';

export const HarvestModuleTable = () => {
  const {
    queryHarvests,
    actionsHarvestsModule,
    dataTable,
    mutationDeleteHarvests,
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
      rowCount={queryHarvests?.data?.rowCount ?? 0}
      isLoading={
        queryHarvests.isLoading ||
        queryHarvests.isRefetching ||
        mutationDeleteHarvests.isPending
      }
    />
  );
};
