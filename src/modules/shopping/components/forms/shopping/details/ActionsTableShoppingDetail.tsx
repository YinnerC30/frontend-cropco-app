import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { ActionModifyRecordFormDataTable } from '@/modules/core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';
import { useFormShoppingContext } from '@/modules/shopping/hooks/context/useFormShoppingContext';
import { ShoppingDetail } from '@/modules/shopping/interfaces';

import { toast } from 'sonner';

export const ActionsTableShoppingDetail = ({ row }: any) => {
  const shoppingDetail = row.original;

  const {
    setShoppingDetail,
    handleOpenDialog,
    form,
    executeValidationFormShopping,
    removeShoppingDetail,
  } = useFormShoppingContext();

  const handleDelete = async () => {
    const detailsForm = form
      .watch('details')
      .filter((detail: ShoppingDetail) => detail.id !== shoppingDetail.id);

    form.setValue('details', detailsForm, { shouldDirty: true });
    removeShoppingDetail(shoppingDetail);

    await form.trigger('details');

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
      <ActionCopyIdRecord id={shoppingDetail.id} />
      <ActionDeleteRecord
        action={() => {
          handleDelete();
          executeValidationFormShopping();
        }}
        disabled={false}
      />
      {/* TODO: Activar disabled */}
      <ActionModifyRecordFormDataTable action={handleModify} />
    </DropDownMenuActions>
  );
};
