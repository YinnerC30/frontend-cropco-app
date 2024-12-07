import {
  DropDownMenuActions,
  ActionCopyIdRecord,
  ActionDeleteRecord,
} from '@/modules/core/components';
import { ActionModifyRecordFormDataTable } from '@/modules/core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { HarvestDetail } from '@/modules/harvests/interfaces';
import { calculateTotal, remove } from '@/modules/harvests/utils/harvestSlice';
import { useAppDispatch } from '@/redux/store';
import { toast } from 'sonner';

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
