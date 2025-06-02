import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/data-table/menu/actions';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useUsersModuleContext } from '../../hooks';
import { usePatchResetPasswordUser } from '../../hooks/mutations';
import { User } from '../../interfaces';
import { ActionResetPassword } from './ActionResetPassword';
import { ActionToogleStatusUser } from './ActionToogleStatusUser';

interface Props {
  row: Row<User>;
}

export const UsersModuleActionsTable: React.FC<Props> = ({ row }) => {
  const { dataTable, actionsUsersModule, mutationDeleteUser } =
    useUsersModuleContext();
  const { id, email, is_active } = row.original;

  const mutationPatchPassword = usePatchResetPasswordUser();

  const handleDelete = () => {
    mutationDeleteUser.mutate(id, {
      onSuccess: () => {
        dataTable.resetSelectionRows();
      },
    });
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />

      <ActionDeleteRecord
        action={handleDelete}
        disabled={!actionsUsersModule['remove_one_user']}
      />

      <ActionModifyRecord
        id={id}
        disabled={!actionsUsersModule['update_one_user']}
      />

      <ActionResetPassword
        id={id}
        mutation={mutationPatchPassword}
        disabled={!actionsUsersModule['reset_password_user']}
        email={email}
      />

      <ActionViewRecord
        id={id}
        disabled={!actionsUsersModule['find_one_user']}
      />

      <ActionToogleStatusUser
        id={id}
        status={is_active}
        disabled={!actionsUsersModule['toggle_status_user']}
      />
    </DropDownMenuActions>
  );
};
