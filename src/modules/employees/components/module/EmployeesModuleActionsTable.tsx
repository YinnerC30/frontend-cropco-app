import { Dialog } from '@/components';
import { useFormChange } from '@/modules/core/components';
import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/data-table/menu/actions';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useState } from 'react';
import { useEmployeesModuleContext } from '../../hooks';
import { Employee } from '../../interfaces/Employee';
import { ActionGenerateCertification } from './ActionGenerateCertification';

interface Props {
  row: Row<Employee>;
}

export const EmployeesModuleActionsTable: React.FC<Props> = ({
  row,
}: Props) => {
  const {
    dataTable,
    actionsEmployeesModule,
    mutationDeleteEmployee,
    mutationGenerateCertification,
  } = useEmployeesModuleContext();

  const { id } = row.original;

  const [open, setOpen] = useState(false);

  const { hasUnsavedChanges, showToast } = useFormChange();

  const handleDelete = () => {
    mutationDeleteEmployee.mutate(id!, {
      onSuccess: () => {
        dataTable.resetSelectionRows();
      },
    });
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    if (hasUnsavedChanges) {
      showToast({ skipRedirection: true, action: () => setOpen(false) });
      return;
    }
    setOpen(false);
  };

  return (
    <Dialog
      defaultOpen={false}
      open={open}
      onOpenChange={setOpen}
      modal={false}
    >
      <DropDownMenuActions>
        <ActionCopyIdRecord id={id!} />

        <ActionDeleteRecord
          action={handleDelete}
          disabled={!actionsEmployeesModule['remove_one_employee']}
        />

        <ActionModifyRecord
          id={id!}
          disabled={!actionsEmployeesModule['update_one_employee']}
        />

        <ActionGenerateCertification
          employeeId={id!}
          disabled={!actionsEmployeesModule['generate_certification_employee']}
          mutation={mutationGenerateCertification}
          handleCloseDialog={handleCloseDialog}
          handleOpenDialog={handleOpenDialog}
        />

        <ActionViewRecord
          id={id!}
          disabled={!actionsEmployeesModule['find_one_employee']}
        />
      </DropDownMenuActions>
    </Dialog>
  );
};
