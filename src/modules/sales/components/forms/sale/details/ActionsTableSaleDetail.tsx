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
import { ActionToggleStatusSaleDetail } from './ActionToggleStatusSaleDetail';

export const ActionsTableSaleDetail: React.FC<{ row: Row<SaleDetail> }> = ({
  row,
}) => {
  const saleDetail = row.original;

  const {
    setSaleDetail,
    handleOpenDialog,
    removeSaleDetail,
    addCropStock,
    toggleStatusPayment,
  } = useFormSaleContext();

  const handleDelete = () => {
    addCropStock({
      id: saleDetail.crop.id,
      name: saleDetail.crop.name,
      stock: saleDetail.amount,
      unit_of_measure: saleDetail.unit_of_measure!,
    });
    removeSaleDetail(saleDetail);
    toast.success(
      `Se ha eliminado la venta del cliente: ${saleDetail.client.full_name}`
    );
  };

  const handleModify = () => {
    setSaleDetail(saleDetail);
    handleOpenDialog();
  };
  const handleToggle = () => {
    toggleStatusPayment(saleDetail.id!);
  };

  const { deletedDate } = row.original;
  const isDisabled = deletedDate !== null;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={saleDetail?.id!} />
      <ActionDeleteRecord
        action={() => {
          handleDelete();
        }}
        disabled={isDisabled}
      />

      <ActionModifyRecordFormDataTable
        disabled={isDisabled}
        action={handleModify}
      />

      <ActionToggleStatusSaleDetail
        disabled={isDisabled}
        action={handleToggle}
      />
    </DropDownMenuActions>
  );
};
