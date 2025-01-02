import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { ActionModifyRecordFormDataTable } from '@/modules/core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';
import { useFormSaleContext } from '@/modules/sales/hooks';
import { SaleDetail } from '@/modules/sales/interfaces';
import { Row } from '@tanstack/react-table';
import React from 'react';

import { toast } from 'sonner';

export const ActionsTableSaleDetail: React.FC<{ row: Row<SaleDetail> }> = ({
  row,
}) => {
  const saleDetail = row.original;

  const { setSaleDetail, handleOpenDialog, formSale, removeSaleDetail } =
    useFormSaleContext();

  const handleDelete = async () => {
    const detailsForm = formSale
      .watch('details')
      .filter((detail: SaleDetail) => detail.id !== saleDetail.id);

    formSale.setValue('details', detailsForm, { shouldDirty: true });
    removeSaleDetail(saleDetail);

    await formSale.trigger('details');

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
      <ActionCopyIdRecord id={saleDetail?.id!} />
      <ActionDeleteRecord
        action={async () => {
          handleDelete();
          await formSale.trigger('details');
        }}
        disabled={false}
      />
      {/* TODO: Activar disabled */}
      <ActionModifyRecordFormDataTable action={handleModify} />
    </DropDownMenuActions>
  );
};
