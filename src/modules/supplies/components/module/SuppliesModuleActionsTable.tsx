import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useSuppliesModuleContext } from '../../hooks';
import { Supply } from '../../interfaces/Supply';

interface Props {
  row: Row<Supply>;
}

export const SuppliesModuleActionsTable: React.FC<Props> = ({ row }) => {
  const {
    dataTable: { resetSelectionRows },
    actionsSuppliesModule,
    mutationDeleteSupply
  } = useSuppliesModuleContext();

  const id = row.original.id ?? '';
  

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
        disabled={!actionsSuppliesModule['remove_one_supply']}
      />

      <ActionModifyRecord
        id={id}
        disabled={!actionsSuppliesModule['update_one_supply']}
      />

      <ActionViewRecord
        id={id}
        disabled={!actionsSuppliesModule['find_one_supply']}
      />
    </DropDownMenuActions>
  );
};
