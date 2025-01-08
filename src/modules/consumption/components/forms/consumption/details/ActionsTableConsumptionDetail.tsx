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

    removeConsumptionDetail,
  } = useFormConsumptionContext();

  const handleDelete = async () => {
    removeConsumptionDetail(consumptionDetail);

    toast.success(
      `Se ha eliminado el consumo del cultivo ${consumptionDetail.supply.name}`
    );
  };

  const handleModify = () => {
    setConsumptionDetail(consumptionDetail);
    handleOpenDialog();
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={consumptionDetail.id!} />
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
