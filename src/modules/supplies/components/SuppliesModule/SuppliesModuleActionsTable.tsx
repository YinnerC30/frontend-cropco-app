import { useAuthenticationContext } from '@/modules/authentication/hooks';

import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useSuppliesModuleContext } from './SuppliesModuleContext';
import { useDeleteSupply } from '../../hooks';

interface Props {
  row: Row<any>;
}

export const SuppliesModuleActionsTable = ({ row }: Props) => {
  const { resetSelectionRows } = useSuppliesModuleContext();
  const { hasPermission } = useAuthenticationContext();
  const { id } = row.original;
  const mutationDeleteSupply = useDeleteSupply();

  const handleDelete = () => {
    mutationDeleteSupply.mutate(id, {
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
        disabled={!hasPermission('supplies', 'remove_one_supply')}
      />

      <ActionModifyRecord
        id={id}
        disabled={!hasPermission('supplies', 'update_one_supply')}
      />

      <ActionViewRecord
        id={id}
        disabled={!hasPermission('supplies', 'find_one_supply')}
      />
    </DropDownMenuActions>
  );
};
