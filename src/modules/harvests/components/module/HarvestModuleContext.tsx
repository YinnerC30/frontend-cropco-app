import { useAuthContext } from '@/auth';
import { useDataTableManual } from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useAdvancedQueryData } from '@/modules/core/hooks/useAdvancedQueryData';
import { createContext } from 'react';
import { useGetAllHarvests } from '../../hooks';
import { ActionsTableHarvest } from './ActionsTableHarvest';
import columnsHarvest from './ColumnsTableHarvest';

export const HarvestsModuleContext = createContext<any>(null);

export const HarvestsModuleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { paramsValues } = useAdvancedQueryData({
    params: [
      'crop',

      'filter_by_date',
      'type_filter_date',
      'date',

      'filter_by_total',
      'type_filter_total',
      'total',

      'filter_by_value_pay',
      'type_filter_value_pay',
      'value_pay',
    ],
  });
  const { query, pagination, setPagination } = useGetAllHarvests({
    ...paramsValues,
  });

  const { validatePermissionsInModule } = useAuthContext();

  const permissionsHarvest = validatePermissionsInModule('harvests');

  const columnsTable = useCreateColumnsTable({
    columns: columnsHarvest,
    actions: ActionsTableHarvest,
  });

  const dataTable = useDataTableManual({
    columns: columnsTable,
    data: query.data ?? [],
    rows: query.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const contextValue = {
    permissionsHarvest,
    query,
    ...dataTable,
    paramsQuery: {
      ...paramsValues,
      crop: { id: paramsValues.crop },
      filter_by_date: {
        type_filter_date: paramsValues.type_filter_date,
        date: !paramsValues.date ? undefined : new Date(paramsValues.date),
      },
      filter_by_total: {
        type_filter_total: paramsValues.type_filter_total,
        total: !paramsValues.total ? 0 : paramsValues.total,
      },
      filter_by_value_pay: {
        type_filter_value_pay: paramsValues.type_filter_value_pay,
        value_pay: !paramsValues.value_pay ? 0 : paramsValues.value_pay,
      },
    },
  };

  return (
    <HarvestsModuleContext.Provider value={contextValue}>
      {children}
    </HarvestsModuleContext.Provider>
  );
};
