import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';
import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { ActionModifyRecordFormDataTable } from '@/modules/core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';

import { ConsumptionDetails } from '@/modules/consumption/interfaces';
import { Row } from '@tanstack/react-table';
import React from 'react';
import { toast } from 'sonner';

export const ActionsTableConsumptionDetail: React.FC<{
  row: Row<ConsumptionDetails>;
}> = ({ row }) => {
  const consumptionDetail = row.original;

  const {
    setConsumptionDetail,
    handleOpenDialog,
    addSupplyStock,
    removeConsumptionDetail,
  } = useFormConsumptionContext();

  const handleDelete = async () => {
    addSupplyStock({
      ...consumptionDetail.supply,
      amount: consumptionDetail.amount,
      unit_of_measure: consumptionDetail.unit_of_measure,
      supply: consumptionDetail.supply,
    } as any);
    removeConsumptionDetail(consumptionDetail);
    toast.success(
      `Se ha eliminado el consumo del insumo ${consumptionDetail.supply.name}`
    );
  };

  const handleModify = () => {
    setConsumptionDetail(consumptionDetail);
    handleOpenDialog();
  };

  const { deletedDate } = row.original;
  const isDisabled = deletedDate !== null;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={consumptionDetail.id!} />
      <ActionDeleteRecord
        action={() => {
          handleDelete();
        }}
        disabled={isDisabled}
      />
      {/* TODO: Activar disabled */}
      <ActionModifyRecordFormDataTable
        action={handleModify}
        disabled={isDisabled}
      />
    </DropDownMenuActions>
  );
};
