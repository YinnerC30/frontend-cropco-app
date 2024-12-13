import { useAuthContext } from '@/auth';
import { useDataTableManual } from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useAdvancedQueryData } from '@/modules/core/hooks/useAdvancedQueryData';
import { createContext } from 'react';

import { ActionsTableWork } from './ActionsTableWork';
import columnsWork from './ColumnsTableWork';
import { useGetAllWorks } from '../../hooks/queries/useGetAllWorks';

export const WorksModuleContext = createContext<any>(null);

export const WorksModuleProvider = ({
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
    ],
  });

  // FIX: Por corregir parametros hook
  const { query, pagination, setPagination } = useGetAllWorks({
    ...paramsValues,
  });

  const { validatePermissionsInModule } = useAuthContext();

  const permissionsWork = validatePermissionsInModule('works');

  const columnsTable = useCreateColumnsTable({
    columns: columnsWork,
    actions: ActionsTableWork,
  });

  const dataTable = useDataTableManual({
    columns: columnsTable,
    data: query.data ?? [],
    rows: query.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const contextValue = {
    permissionsWork,
    query,
    ...dataTable,
    // FIX: Corregir paramsQuery
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
    },
  };

  return (
    <WorksModuleContext.Provider value={contextValue}>
      {children}
    </WorksModuleContext.Provider>
  );
};
