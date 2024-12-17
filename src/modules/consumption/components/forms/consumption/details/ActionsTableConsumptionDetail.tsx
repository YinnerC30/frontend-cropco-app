import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { ActionModifyRecordFormDataTable } from '@/modules/core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';
import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';

import { toast } from 'sonner';
import { ConsumptionDetails } from '@/modules/consumption/interfaces';

export const ActionsTableConsumptionDetail = ({ row }: any) => {
  const consumptionDetail = row.original;

  const {
    setConsumptionDetail,
    handleOpenDialog,
    form,
    executeValidationFormConsumption,
    removeConsumptionDetail,
  } = useFormConsumptionContext();

  const handleDelete = async () => {
    const detailsForm = form
      .watch('details')
      .filter(
        (detail: ConsumptionDetails) => detail.id !== consumptionDetail.id
      );

    form.setValue('details', detailsForm, { shouldDirty: true });
    removeConsumptionDetail(consumptionDetail);

    await form.trigger('details');

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
      <ActionCopyIdRecord id={consumptionDetail.id} />
      <ActionDeleteRecord
        action={() => {
          handleDelete();
          executeValidationFormConsumption();
        }}
        disabled={false}
      />
      {/* TODO: Activar disabled */}
      <ActionModifyRecordFormDataTable action={handleModify} />
    </DropDownMenuActions>
  );
};
