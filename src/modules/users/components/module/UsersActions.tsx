import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { useUsersModuleContext } from '../../hooks';
import { MODULE_USER_PATHS } from '../../routes/pathsRoutes';

export const UsersActions: React.FC = () => {
  const { queryUsers, dataTable, mutationDeleteUsers, actionsUsersModule } =
    useUsersModuleContext();

  const handleDeleteBulkUsers = (): void => {
    mutationDeleteUsers.mutate(
      { userIds: dataTable.getIdsToRowsSelected() },
      {
        onSuccess: () => {
          dataTable.resetSelectionRows();
        },
      }
    );
  };

  const { resetSelectionRows, hasSelectedRecords } = dataTable;

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={async () => {
          await queryUsers.refetch();
        }}
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
