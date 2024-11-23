import { useAuthorization } from '@/modules/authentication/hooks';

import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/DataTable/DataTableMenuActions/Actions';
import { DropDownMenuActions } from '@/modules/core/components/DataTable/DataTableMenuActions/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useDeleteUser } from '../../hooks';
import { ActionResetPassword } from './ActionResetPassword';
import { usePatchPasswordUser } from '../../hooks/mutations';

interface Props {
  row: Row<any>;
}

export const UsersModuleActionsTable = ({ row }: Props) => {
  const { hasPermission } = useAuthorization();
  const { id } = row.original;
  const mutationDeleteUser = useDeleteUser();
  const mutationPatchPassword = usePatchPasswordUser();

  const handleDelete = () => {
    mutationDeleteUser.mutate(id);
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

      <ActionResetPassword id={id} mutation={mutationPatchPassword} />

      <ActionViewRecord
        id={id}
        disabled={!hasPermission('users', 'find_one_user')}
      />
    </DropDownMenuActions>
  );
};