import { useAuthContext } from '@/auth/hooks';

import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/data-table/menu/actions';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useDeleteCrop } from '../../hooks/mutations/useDeleteCrop';
import { useCropsModuleContext } from './CropsModuleContext';

interface Props {
  row: Row<any>;
}

export const CropsModuleActionsTable = ({ row }: Props) => {
  const { resetSelectionRows } = useCropsModuleContext();
  const { hasPermission } = useAuthContext();
  const { id } = row.original;
  const mutationDeleteCrop = useDeleteCrop();

  const handleDelete = () => {
    mutationDeleteCrop.mutate(id, {
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
        disabled={!hasPermission('crops', 'remove_one_crop')}
      />

      <ActionModifyRecord
        id={id}
        disabled={!hasPermission('crops', 'update_one_crop')}
      />

      <ActionViewRecord
        id={id}
        disabled={!hasPermission('crops', 'find_one_crop')}
      />
    </DropDownMenuActions>
  );
};
