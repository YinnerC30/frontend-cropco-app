import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { ActionModifyRecordFormDataTable } from '@/modules/core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';
import { useFormShoppingContext } from '@/modules/shopping/hooks/context/useFormShoppingContext';
import { ShoppingDetail } from '@/modules/shopping/interfaces';
import { Row } from '@tanstack/react-table';

import { toast } from 'sonner';

export const ActionsTableShoppingDetail = ({
  row,
}: {
  row: Row<ShoppingDetail>;
}) => {
  const shoppingDetail = row.original;

  const { setShoppingDetail, handleOpenDialog, removeShoppingDetail } =
    useFormShoppingContext();

  const handleDelete = () => {
    removeShoppingDetail(shoppingDetail);
    toast.success(
      `Se ha eliminado la venta del Proveedor ${shoppingDetail.supplier.first_name}`
    );
  };

  const handleModify = () => {
    setShoppingDetail(shoppingDetail);
    handleOpenDialog();
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={shoppingDetail?.id!} />
      <ActionDeleteRecord
        action={() => {
          handleDelete();
        }}
        disabled={false}
      />
      <ActionModifyRecordFormDataTable action={handleModify} />
    </DropDownMenuActions>
  );
};
