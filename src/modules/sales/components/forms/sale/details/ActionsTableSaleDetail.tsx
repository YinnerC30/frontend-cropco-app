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

  const { setSaleDetail, handleOpenDialog, removeSaleDetail } =
    useFormSaleContext();

  const handleDelete = () => {
    removeSaleDetail(saleDetail);
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
        action={() => {
          handleDelete();
        }}
        disabled={false}
      />
      {/* TODO: Activar disabled */}
      <ActionModifyRecordFormDataTable action={handleModify} />
    </DropDownMenuActions>
  );
};
