import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/data-table/menu/actions';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';

import { ActionResetPassword } from './ActionResetPassword';
import { ActionToogleStatusAdministrator } from './ActionToogleStatusAdministrator';
import { useAdministratorsModuleContext } from '../../hooks/context/useAdministratorsModuleContext';
import { usePatchResetPasswordAdministrator } from '../../hooks/mutations/userPatchResetPasswordAdministrator';
import { Administrator } from '../../interfaces/Administrator';

interface Props {
  row: Row<Administrator>;
}

export const AdministratorsModuleActionsTable: React.FC<Props> = ({ row }) => {
  const {
    dataTable,
    // actionsAdministratorsModule,

    mutationDeleteAdministrator,
  } = useAdministratorsModuleContext();
  const { id, email, is_active } = row.original;

  // const isAdmin = role === 'admin';

  const mutationPatchPassword = usePatchResetPasswordAdministrator();

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

      <ActionDeleteRecord action={handleDelete} disabled={false} />

      <ActionModifyRecord id={id} disabled={false} />

      <ActionResetPassword
        id={id}
        mutation={mutationPatchPassword}
        disabled={false}
        email={email}
      />

      <ActionViewRecord id={id} disabled={false} />

      <ActionToogleStatusAdministrator
        id={id}
        status={is_active}
        disabled={false}
      />
    </DropDownMenuActions>
  );
};
