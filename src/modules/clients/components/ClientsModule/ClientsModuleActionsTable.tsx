import { useAuthContext } from '@/auth/hooks';

import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useDeleteClient } from '../../hooks/mutations/useDeleteClient';
import { useClientsModuleContext } from './ClientsModuleContext';

interface Props {
  row: Row<any>;
}

export const ClientsModuleActionsTable = ({ row }: Props) => {
  const { resetSelectionRows } = useClientsModuleContext();
  const { hasPermission } = useAuthContext();
  const { id } = row.original;
  const mutationDeleteClient = useDeleteClient();

  const handleDelete = () => {
    mutationDeleteClient.mutate(id, {
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
        disabled={!hasPermission('clients', 'remove_one_client')}
      />

      <ActionModifyRecord
        id={id}
        disabled={!hasPermission('clients', 'update_one_client')}
      />

      <ActionViewRecord
        id={id}
        disabled={!hasPermission('clients', 'find_one_client')}
      />
    </DropDownMenuActions>
  );
};
