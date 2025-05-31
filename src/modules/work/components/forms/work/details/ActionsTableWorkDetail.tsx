import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { ActionModifyRecordFormDataTable } from '@/modules/core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';
import { useFormWorkContext } from '@/modules/work/hooks/context/useFormWorkContext';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';
import { Row } from '@tanstack/react-table';

import { toast } from 'sonner';

export const ActionsTableWorkDetail = ({ row }: { row: Row<WorkDetail> }) => {
  const workDetail: WorkDetail = row.original;

  const { setWorkDetail, handleOpenDialog, removeWorkDetail } =
    useFormWorkContext();

  const handleDelete = async () => {
    removeWorkDetail(workDetail);
    toast.success(
      `Se ha eliminado la cosecha del empleado: ${workDetail.employee.full_name}`
    );
  };

  const handleModify = () => {
    setWorkDetail(workDetail);
    handleOpenDialog();
  };

  const { deletedDate, payment_is_pending } = row.original;
  const isDisabled = deletedDate !== null || payment_is_pending === false;

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={workDetail?.id!} />
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
