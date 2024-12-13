import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  DropDownMenuActions,
} from '@/modules/core/components';
import { ActionModifyRecordFormDataTable } from '@/modules/core/components/data-table/menu/actions/ActionModifyRecordFormDataTable';
import { useFormWorkContext } from '@/modules/work/hooks/context/useFormWorkContext';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';


import { toast } from 'sonner';

export const ActionsTableWorkDetail = ({ row }: any) => {
  const workDetail = row.original;

  const {
    setWorkDetail,
    handleOpenDialog,
    form,
    executeValidationFormWork,
    removeWorkDetail,
  } = useFormWorkContext();

  const handleDelete = async () => {
    const detailsForm = form
      .watch('details')
      .filter((detail: WorkDetail) => detail.id !== workDetail.id);

    form.setValue('details', detailsForm, { shouldDirty: true });
    removeWorkDetail(workDetail);

    await form.trigger('details');

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
      <ActionCopyIdRecord id={workDetail.id} />
      <ActionDeleteRecord
        action={() => {
          handleDelete();
          executeValidationFormWork();
        }}
        disabled={false}
      />
      {/* TODO: Activar disabled */}
      <ActionModifyRecordFormDataTable action={handleModify} />
    </DropDownMenuActions>
  );
};
