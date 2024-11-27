import { useAuthorization } from '@/modules/authentication/hooks';

import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/DataTable/DataTableMenuActions/Actions';
import { DropDownMenuActions } from '@/modules/core/components/DataTable/DataTableMenuActions/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useDeleteCrop } from '../../hooks/useDeleteCrop';

interface Props {
  row: Row<any>;
}

export const CropsModuleActionsTable = ({ row }: Props) => {
  const { hasPermission } = useAuthorization();
  const { id } = row.original;
  const mutationDeleteCrop = useDeleteCrop();

  const handleDelete = () => {
    mutationDeleteCrop.mutate(id);
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
