import { useAuthorizationContext } from '@/modules/authentication/hooks';

import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/data-table/menu/actions';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useDeleteUser } from '../../hooks';
import { ActionResetPassword } from './ActionResetPassword';
import { usePatchPasswordUser } from '../../hooks/mutations';
import { useUsersModuleContext } from './UsersModuleContext';

interface Props {
  row: Row<any>;
}

export const UsersModuleActionsTable = ({ row }: Props) => {
  const { resetSelectionRows } = useUsersModuleContext();
  const { hasPermission } = useAuthorizationContext();
  const { id, email } = row.original;
  const mutationDeleteUser = useDeleteUser();
  const mutationPatchPassword = usePatchPasswordUser();

  const handleDelete = () => {
    mutationDeleteUser.mutate(id, {
      onSuccess: () => {
        resetSelectionRows();
      },
    });
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />

      <ActionDeleteRecord
        action={handleDelete}
        disabled={!hasPermission('users', 'remove_one_user')}
      />

      <ActionModifyRecord
        id={id}
        disabled={!hasPermission('users', 'update_one_user')}
      />

      <ActionResetPassword
        id={id}
        mutation={mutationPatchPassword}
        disabled={!hasPermission('users', 'reset_password_user')}
        email={email}
      />

      <ActionViewRecord
        id={id}
        disabled={!hasPermission('users', 'find_one_user')}
      />
    </DropDownMenuActions>
  );
};
