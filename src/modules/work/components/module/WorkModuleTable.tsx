import { DataTableTemplate } from '@/modules/core/components';
import { useWorkModuleContext } from '../../hooks/context/useWorkModuleContext';

export const WorkModuleTable = () => {
  const {
    dataTable: { table, lengthColumns },
    queryWorks,
    actionsWorksModule,
    mutationDeleteWorks,
    mutationDeleteWork,
  } = useWorkModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !actionsWorksModule['find_all_works']
          ? 'No tienes permiso para ver el listado de los trabajos 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!actionsWorksModule['find_one_work']}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={queryWorks?.data?.total_row_count ?? 0}
      isLoading={
        queryWorks.isLoading ||
        queryWorks.isRefetching ||
        mutationDeleteWorks.isPending ||
        mutationDeleteWork.isPending
      }
    />
  );
};
