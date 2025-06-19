import { DataTableTemplate } from '@/modules/core/components';
import { useTenantsModuleContext } from './TenantsModuleContext';

export const TenantsTable: React.FC = () => {
  const { dataTable, queryTenants } = useTenantsModuleContext();

  return (
    <DataTableTemplate
      errorMessage={''}
      disabledDoubleClick={true}
      table={dataTable.table}
      lengthColumns={dataTable.lengthColumns}
      rowCount={queryTenants.data?.total_row_count || 0}
      isLoading={queryTenants.isFetching}
    />
  );
};
