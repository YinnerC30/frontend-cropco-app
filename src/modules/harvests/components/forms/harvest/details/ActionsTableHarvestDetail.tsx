import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { ActionModifyRecordFormDataTable } from '@/modules/core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { HarvestDetail } from '@/modules/harvests/interfaces';
import { Row } from '@tanstack/react-table';
import { toast } from 'sonner';

export const ActionsTableHarvestDetail = ({
  row,
}: {
  row: Row<HarvestDetail>;
}) => {
  const harvestDetail = row.original;

  const {
    setHarvestDetail,
    handleOpenDialog,
    formHarvestDetail,
    executeValidationFormHarvest,
    removeHarvestDetail,
  } = useFormHarvestContext();

  const handleDelete = async () => {
    const detailsForm = formHarvestDetail
      .watch('details')
      .filter((detail: HarvestDetail) => detail.id !== harvestDetail.id);

    formHarvestDetail.setValue('details', detailsForm, { shouldDirty: true });
    removeHarvestDetail(harvestDetail);

    await formHarvestDetail.trigger('details');

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
      <ActionCopyIdRecord id={harvestDetail?.id!} />
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
