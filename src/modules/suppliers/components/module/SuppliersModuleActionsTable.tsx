
import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/data-table/menu/actions';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useSuppliersModuleContext } from '../../hooks';
import { Supplier } from '../../interfaces/Supplier';

interface Props {
  row: Row<Supplier>;
}

export const SuppliersModuleActionsTable: React.FC<Props> = ({ row }: Props) => {
  const { dataTable, actionsSuppliersModule, mutationDeleteSupplier } = useSuppliersModuleContext();

  const id = row.original.id ?? '';
  

  const handleDelete = () => {
    mutationDeleteSupplier.mutate(id, {
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
        disabled={!actionsSuppliersModule['remove_one_supplier']}
      />

      <ActionModifyRecord
        id={id}
        disabled={!actionsSuppliersModule['update_one_supplier']}
      />

      <ActionViewRecord
        id={id}
        disabled={!actionsSuppliersModule['find_one_supplier']}
      />
    </DropDownMenuActions>
  );
};
