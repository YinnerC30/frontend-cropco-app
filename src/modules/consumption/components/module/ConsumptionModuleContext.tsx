import { useAuthContext } from '@/auth';
import { useDataTableManual } from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useAdvancedQueryData } from '@/modules/core/hooks/useAdvancedQueryData';
import { createContext } from 'react';

import columnsConsumption from './ColumnsTableConsumption';
import { ActionsTableConsumption } from './ActionsTableConsumption';
import { useGetAllConsumptions } from '../../hooks/queries/useGetAllConsumptions';

export const ConsumptionModuleContext = createContext<any>(null);

export const ConsumptionModuleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { paramsValues } = useAdvancedQueryData({
    params: ['filter_by_date', 'type_filter_date', 'date'],
  });

  const { query, pagination, setPagination } = useGetAllConsumptions({
    ...paramsValues,
  });

  const { validatePermissionsInModule } = useAuthContext();

  const permissionsConsumption = validatePermissionsInModule('supplies');

  console.log(permissionsConsumption);

  const columnsTable = useCreateColumnsTable({
    columns: columnsConsumption,
    actions: ActionsTableConsumption,
  });

  const dataTable = useDataTableManual({
    columns: columnsTable,
    data: query.data ?? [],
    rows: query.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const contextValue = {
    permissionsConsumption,
    query,
    ...dataTable,

    paramsQuery: {
      ...paramsValues,
      filter_by_date: {
        type_filter_date: paramsValues.type_filter_date,
        date: !paramsValues.date ? undefined : new Date(paramsValues.date),
      },
    },
  };

  return (
    <ConsumptionModuleContext.Provider value={contextValue}>
      {children}
    </ConsumptionModuleContext.Provider>
  );
};
