import { DataTableTemplate } from '@/modules/core/components';
import { useWorkModuleContext } from '../../hooks/context/useWorkModuleContext';

export const WorkModuleTable = () => {
  const { table, lengthColumns, query, permissionsWork } =
    useWorkModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !permissionsWork['find_all_works']
          ? 'No tienes permiso para ver el listado de las cosechas 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!permissionsWork['find_one_work']}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={query?.data?.rowCount ?? 0}
      isLoading={query.isLoading || query.isRefetching}
    />
  );
};
