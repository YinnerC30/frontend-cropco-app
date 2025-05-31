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

  const { setHarvestDetail, handleOpenDialog, removeHarvestDetail } =
    useFormHarvestContext();

  const handleDelete = () => {
    removeHarvestDetail(harvestDetail);
    toast.success(
      `Se ha eliminado la cosecha del empleado: ${harvestDetail.employee.full_name}`
    );
  };

  const handleModify = () => {
    setHarvestDetail(harvestDetail);
    handleOpenDialog();
  };

  const { deletedDate, payment_is_pending } = row.original;
  const isDisabled = deletedDate !== null || payment_is_pending === false;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={harvestDetail?.id!} />
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
    </DropDownMenuActions>
  );
};
