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

interface Props {
  row: Row<HarvestDetail>;
}

export const ActionsTableHarvestDetail: React.FC<Props> = ({ row }) => {
  const harvestDetail = row.original;

  const {
    setHarvestDetail,
    handleOpenDialog,
    formHarvestDetail,
    formHarvest,
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
        action={async () => {
          handleDelete();
          await formHarvest.trigger();
        }}
        disabled={false}
      />
      {/* TODO: Activar disabled */}
      <ActionModifyRecordFormDataTable action={handleModify} />
    </DropDownMenuActions>
  );
};
