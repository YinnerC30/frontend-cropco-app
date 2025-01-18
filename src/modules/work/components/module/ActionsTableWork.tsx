import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { Row } from '@tanstack/react-table';
import { useWorkModuleContext } from '../../hooks/context/useWorkModuleContext';
import { Work } from '../../interfaces/Work';
import { MODULE_WORKS_PATHS } from '../../routes/pathRoutes';

export const ActionsTableWork = ({ row }: { row: Row<Work> }) => {
  const {
    dataTable: { resetSelectionRows },
    actionsWorksModule,
    mutationDeleteWork: { mutate },
  } = useWorkModuleContext();
  const id = row.original.id ?? '';

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
        disabled={!actionsWorksModule['remove_one_work']}
      />
      <ActionModifyRecord
        id={id}
        path={MODULE_WORKS_PATHS.Update + id}
        disabled={!actionsWorksModule['update_one_work']}
      />
      <ActionViewRecord
        id={id}
        path={MODULE_WORKS_PATHS.ViewOne + id}
        disabled={!actionsWorksModule['find_one_work']}
      />
    </DropDownMenuActions>
  );
};
