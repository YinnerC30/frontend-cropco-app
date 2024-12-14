import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { ActionModifyRecordFormDataTable } from '@/modules/core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';
import { useFormSaleContext } from '@/modules/sales/hooks';
import { SaleDetail } from '@/modules/sales/interfaces';

import { toast } from 'sonner';

export const ActionsTableSaleDetail = ({ row }: any) => {
  const saleDetail = row.original;

  const {
    setSaleDetail,
    handleOpenDialog,
    form,
    executeValidationFormSale,
    removeSaleDetail,
  } = useFormSaleContext();

  const handleDelete = async () => {
    const detailsForm = form
      .watch('details')
      .filter((detail: SaleDetail) => detail.id !== saleDetail.id);

    form.setValue('details', detailsForm, { shouldDirty: true });
    removeSaleDetail(saleDetail);

    await form.trigger('details');

    toast.success(
      `Se ha eliminado la venta del cliente ${saleDetail.client.first_name}`
    );
  };

  const handleModify = () => {
    setSaleDetail(saleDetail);
    handleOpenDialog();
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={saleDetail.id} />
      <ActionDeleteRecord
        action={() => {
          handleDelete();
          executeValidationFormSale();
        }}
        disabled={false}
      />
      {/* TODO: Activar disabled */}
      <ActionModifyRecordFormDataTable action={handleModify} />
    </DropDownMenuActions>
  );
};
