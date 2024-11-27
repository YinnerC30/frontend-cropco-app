import { useAuthorization } from '@/modules/authentication/hooks';

import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/data-table/menu/actions';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useDeleteSupplier } from '../../hooks/mutations/useDeleteSupplier';
import { useSuppliersModuleContext } from './SuppliersModuleContext';

interface Props {
  row: Row<any>;
}

export const SuppliersModuleActionsTable = ({ row }: Props) => {
  const { resetSelectionRows } = useSuppliersModuleContext();
  const { hasPermission } = useAuthorization();
  const { id } = row.original;
  const mutationDeleteSupplier = useDeleteSupplier();

  const handleDelete = () => {
    mutationDeleteSupplier.mutate(id, {
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
        disabled={!hasPermission('suppliers', 'remove_one_supplier')}
      />

      <ActionModifyRecord
        id={id}
        disabled={!hasPermission('suppliers', 'update_one_supplier')}
      />

      <ActionViewRecord
        id={id}
        disabled={!hasPermission('suppliers', 'find_one_supplier')}
      />
    </DropDownMenuActions>
  );
};
