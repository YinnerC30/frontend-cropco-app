import { useAppDispatch } from '@/redux/store';
import { toast } from 'sonner';

import { calculateTotal, remove } from '../../utils/harvestSlice';

import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { useFormHarvestContext } from '../../hooks';
import { ActionModifyRecordFormDataTable } from '../../../core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';
import { HarvestDetail } from '../../interfaces';

export const ActionsTableHarvestDetail = ({ row }: any) => {
  const harvestDetail = row.original;
  const dispatch = useAppDispatch();
  const {
    setHarvestDetail,
    handleOpenDialog,
    form,
    executeValidationFormHarvest,
  } = useFormHarvestContext();

  const handleDelete = async () => {
    const detailsForm = form
      .watch('details')
      .filter((detail: HarvestDetail) => detail.id !== harvestDetail.id);

    form.setValue('details', detailsForm, { shouldDirty: true });
    dispatch(remove(harvestDetail));

    await form.trigger('details');
    dispatch(calculateTotal());

    toast.success(
      `Se ha eliminado la cosecha del empleado ${harvestDetail.employee.first_name}`
    );
  };

  const handleModify = () => {
    setHarvestDetail(harvestDetail);
    handleOpenDialog();
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={harvestDetail.id} />
      <ActionDeleteRecord
        action={() => {
          handleDelete();
          executeValidationFormHarvest();
        }}
        disabled={false}
      />
      {/* TODO: Activar disabled */}
      <ActionModifyRecordFormDataTable action={handleModify} />
    </DropDownMenuActions>
  );
};
