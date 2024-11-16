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

interface Props {
  row: Row<any>;
}

export const UsersModuleActionsTable = ({ row }: Props) => {
  const { hasPermission } = useAuthorization();
  const { id } = row.original;
  const { mutate } = useDeleteUser();

  const handleDelete = () => {
    mutate(id);
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

      <ActionViewRecord
        id={id}
        disabled={!hasPermission('users', 'find_one_user')}
      />
    </DropDownMenuActions>
  );
};
