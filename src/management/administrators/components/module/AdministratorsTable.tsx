import { DataTableTemplate } from '@/modules/core/components';
import { useAdministratorsModuleContext } from '../../hooks/context/useAdministratorsModuleContext';

export const AdministratorsTable: React.FC = () => {
  const {
    dataTable,
    queryAdministrators,
    // actionsAdministratorsModule,
    // mutationDeleteAdministrators,
    mutationDeleteAdministrator,
  } = useAdministratorsModuleContext();

  const { table, lengthColumns } = dataTable;

  return (
    <DataTableTemplate
      errorMessage={'No hay registros.'}
      disabledDoubleClick={false}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={queryAdministrators.data?.total_row_count ?? 0}
      isLoading={
        queryAdministrators.isLoading ||
        queryAdministrators.isRefetching ||
        // mutationDeleteAdministrators.isPending ||
        mutationDeleteAdministrator.isPending
      }
    />
  );
};
