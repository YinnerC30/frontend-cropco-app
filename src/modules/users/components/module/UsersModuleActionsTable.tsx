import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/data-table/menu/actions';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useDeleteUser, useUsersModuleContext } from '../../hooks';
import { usePatchResetPasswordUser } from '../../hooks/mutations';
import { ActionResetPassword } from './ActionResetPassword';
import { User } from '../../interfaces';

interface Props {
  row: Row<User>;
}

export const UsersModuleActionsTable: React.FC<Props> = ({ row }) => {
  const { dataTable, actionsUsersModule } = useUsersModuleContext();
  const { id, email } = row.original;
  const mutationDeleteUser = useDeleteUser();
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
    </DropDownMenuActions>
  );
};
