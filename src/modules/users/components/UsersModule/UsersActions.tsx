import { Button } from '@/components';
import {
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { MODULE_USER_PATHS } from '../../routes/pathsRoutes';
import { useUsersModuleContext } from './UsersModuleContext';

export const UsersActions = () => {
  const {
    query,
    hasPermission,
    showButtonDeleteBulk,
    resetSelectionRows,
    handleDeleteBulkUsers,
    isPending,
  } = useUsersModuleContext();

  return (
    <div className="flex items-center w-[100%] justify-between">
      <ButtonRefetchData
        onClick={query.refetch}
        disabled={!hasPermission('users', 'find_all_users')}
      />

      <div className="flex items-center gap-2">
        <Button
          onClick={() => resetSelectionRows()}
          className={`${!showButtonDeleteBulk && 'hidden'}`}
        >
          Borrar selección
        </Button>

        <ButtonDeleteBulk
          disabled={isPending || !hasPermission('users', 'remove_bulk_users')}
          onClick={handleDeleteBulkUsers}
          visible={showButtonDeleteBulk}
        />

        <ButtonCreateRecord
          route={MODULE_USER_PATHS.Create}
          disabled={!hasPermission('users', 'create_user')}
        />
      </div>
    </div>
  );
};
