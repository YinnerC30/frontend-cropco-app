import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { useWorkModuleContext } from '../../hooks/context/useWorkModuleContext';
import { useDeleteWork } from '../../hooks/mutations/useDeleteWork';
import { MODULE_WORKS_PATHS } from '../../routes/pathRoutes';

export const ActionsTableWork = ({ row }: any) => {
  const { resetSelectionRows, permissionsWork } = useWorkModuleContext();
  const { id } = row.original;
  const { mutate } = useDeleteWork();

  const handleDelete = () => {
    mutate(id, {
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
        disabled={!permissionsWork['remove_one_work']}
      />
      <ActionModifyRecord
        id={id}
        path={MODULE_WORKS_PATHS.Update + id}
        disabled={!permissionsWork['update_one_work']}
      />
      <ActionViewRecord
        id={id}
        path={MODULE_WORKS_PATHS.ViewOne + id}
        disabled={!permissionsWork['find_one_work']}
      />
    </DropDownMenuActions>
  );
};
