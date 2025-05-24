import { DataTableTemplate } from '@/modules/core/components';
import { useConsumptionModuleContext } from '../../hooks/context/useConsumptionModuleContext';

export const ConsumptionModuleTable: React.FC = () => {
  const {
    dataTable: { table, lengthColumns },
    queryConsumptions,
    actionsConsumptionsModule,
    mutationDeleteConsumptions,
    mutationDeleteConsumption,
  } = useConsumptionModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !actionsConsumptionsModule['find_all_supplies_consumption']
          ? 'No tienes permiso para ver el listado de las compras 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={
        !actionsConsumptionsModule['find_one_supplies_consumption']
      }
      table={table}
      lengthColumns={lengthColumns}
      rowCount={queryConsumptions?.data?.total_row_count ?? 0}
      isLoading={
        queryConsumptions.isLoading ||
        queryConsumptions.isRefetching ||
        mutationDeleteConsumptions.isPending ||
        mutationDeleteConsumption.isPending
      }
    />
  );
};
