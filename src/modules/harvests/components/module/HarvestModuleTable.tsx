import { DataTableTemplate } from '@/modules/core/components';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';

export const HarvestModuleTable = () => {
  const { table, lengthColumns, query, hasPermission } =
    useHarvestModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !hasPermission('harvests', 'find_all_harvests')
          ? 'No tienes permiso para ver el listado de las cosechas 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!hasPermission('harvests', 'find_one_harvest')}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={query?.data?.rowCount ?? 0}
      isLoading={query.isLoading || query.isRefetching}
    />
  );
};
