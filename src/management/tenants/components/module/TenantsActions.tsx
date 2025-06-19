import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';
import { useTenantsModuleContext } from './TenantsModuleContext';
import { MODULE_TENANTS_PATHS } from '../../routes/pathRoutes';

export const TenantsActions: React.FC = () => {
  const { queryTenants, dataTable } = useTenantsModuleContext();

  const handleDeleteBulkTenants = () => {};

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={async () => {
          await queryTenants.refetch();
        }}
        disabled={false}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => dataTable.resetSelectionRows()}
          visible={dataTable.hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={false}
          onClick={handleDeleteBulkTenants}
          visible={dataTable.hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_TENANTS_PATHS.Create}
          disabled={false}
          className=""
        />
      </div>
    </div>
  );
};
