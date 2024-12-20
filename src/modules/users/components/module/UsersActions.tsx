import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { useUsersModuleContext } from '../../hooks';
import { MODULE_USER_PATHS } from '../../routes/pathsRoutes';

export const UsersActions = () => {
  const {
    queryUsers,
    dataTable,
    handleDeleteBulkUsers,
    mutationDeleteUsers,
    actionsUsersModule,
  } = useUsersModuleContext();

  const { resetSelectionRows, hasSelectedRecords } = dataTable;

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={queryUsers.refetch}
        disabled={!actionsUsersModule['find_all_users']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={resetSelectionRows}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            mutationDeleteUsers.isPending ||
            !actionsUsersModule['remove_bulk_users']
          }
          onClick={handleDeleteBulkUsers}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_USER_PATHS.Create}
          disabled={!actionsUsersModule['create_user']}
        />
      </div>
    </div>
  );
};
