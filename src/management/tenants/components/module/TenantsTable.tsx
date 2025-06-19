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
      rowCount={0}
      isLoading={queryTenants.isFetching}
    />
  );
};
