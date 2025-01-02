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

  const { setWorkDetail, handleOpenDialog, removeWorkDetail, formWork } =
    useFormWorkContext();

  const handleDelete = async () => {
    removeWorkDetail(workDetail);
    await formWork.trigger('details');
    toast.success(
      `Se ha eliminado la cosecha del empleado ${workDetail.employee.first_name}`
    );
  };

  const handleModify = () => {
    setWorkDetail(workDetail);
    handleOpenDialog();
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={workDetail?.id!} />
      <ActionDeleteRecord
        action={async () => {
          handleDelete();
          await formWork.trigger('details');
        }}
        disabled={false}
      />
      <ActionModifyRecordFormDataTable action={handleModify} />
    </DropDownMenuActions>
  );
};
