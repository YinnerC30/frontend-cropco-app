
import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useClientsModuleContext } from '../../hooks';
import { useDeleteClient } from '../../hooks/mutations/useDeleteClient';
import { Client } from '../../interfaces/Client';

interface Props {
  row: Row<Client>;
}

export const ClientsModuleActionsTable: React.FC<Props> = ({ row }) => {
  const { dataTable, actionsClientsModule } = useClientsModuleContext();

  const id = row?.original?.id ?? '';
  const mutationDeleteClient = useDeleteClient();

  const handleDelete = () => {
    mutationDeleteClient.mutate(id, {
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
        disabled={!actionsClientsModule['remove_one_client']}
      />

      <ActionModifyRecord
        id={id}
        disabled={!actionsClientsModule['update_one_client']}
      />

      <ActionViewRecord
        id={id}
        disabled={!actionsClientsModule['find_one_client']}
      />
    </DropDownMenuActions>
  );
};
