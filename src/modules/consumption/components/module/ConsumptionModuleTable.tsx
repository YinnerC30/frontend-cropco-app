import { DataTableTemplate } from '@/modules/core/components';
import { useConsumptionModuleContext } from '../../hooks/context/useConsumptionModuleContext';

export const ConsumptionModuleTable = () => {
  const { table, lengthColumns, query, permissionsConsumption } =
    useConsumptionModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !permissionsConsumption['find_all_supplies_consumption']
          ? 'No tienes permiso para ver el listado de las compras 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!permissionsConsumption['find_one_supplies_consumption']}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={query?.data?.rowCount ?? 0}
      isLoading={query.isLoading || query.isRefetching}
    />
  );
};
