import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/data-table/menu/actions';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';

import { useAdministratorsModuleContext } from '../../hooks/context/useAdministratorsModuleContext';
import { usePutResetPasswordAdministrator } from '../../hooks/mutations/userPutResetPasswordAdministrator';
import { Administrator } from '../../interfaces/Administrator';
import { ActionResetPassword } from './ActionResetPassword';
import { ActionToogleStatusAdministrator } from './ActionToogleStatusAdministrator';

interface Props {
  row: Row<Administrator>;
}

export const AdministratorsModuleActionsTable: React.FC<Props> = ({ row }) => {
  const {
    dataTable,
    // actionsAdministratorsModule,

    mutationDeleteAdministrator,
  } = useAdministratorsModuleContext();
  const { id, email, is_active, role } = row.original;

  const isAdmin = role === 'admin';

  const mutationPatchPassword = usePutResetPasswordAdministrator();

  const handleDelete = () => {
    mutationDeleteAdministrator.mutate(id, {
      onSuccess: () => {
        dataTable.resetSelectionRows();
      },
    });
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />

      <ActionDeleteRecord action={handleDelete} disabled={isAdmin} />

      <ActionModifyRecord id={id} disabled={isAdmin} />

      <ActionResetPassword
        id={id}
        mutation={mutationPatchPassword}
        disabled={isAdmin}
        email={email}
      />

      <ActionViewRecord id={id} disabled={false} />

      <ActionToogleStatusAdministrator
        id={id}
        status={is_active}
        disabled={isAdmin}
      />
    </DropDownMenuActions>
  );
};
