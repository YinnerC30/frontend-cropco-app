import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { MODULE_USER_PATHS } from '../../routes/pathsRoutes';
import { useUsersModuleContext } from '../../hooks';

export const UsersActions = () => {
  const {
    query,
    hasPermission,
    hasSelectedRecords,
    resetSelectionRows,
    handleDeleteBulkUsers,
    isPending,
  } = useUsersModuleContext();

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={query.refetch}
        disabled={!hasPermission('users', 'find_all_users')}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={isPending || !hasPermission('users', 'remove_bulk_users')}
          onClick={handleDeleteBulkUsers}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_USER_PATHS.Create}
          disabled={!hasPermission('users', 'create_user')}
          className=""
        />
      </div>
    </div>
  );
};
