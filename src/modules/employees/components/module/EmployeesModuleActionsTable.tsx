import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/data-table/menu/actions';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useEmployeesModuleContext } from '../../hooks';
import { Employee } from '../../interfaces/Employee';
import { ActionGetCertification } from './ActionGetCertification';

interface Props {
  row: Row<Employee>;
}

export const EmployeesModuleActionsTable: React.FC<Props> = ({
  row,
}: Props) => {
  const { dataTable, actionsEmployeesModule, mutationDeleteEmployee } = useEmployeesModuleContext();

  const { id } = row.original;
  

  const handleDelete = () => {
    mutationDeleteEmployee.mutate(id!, {
      onSuccess: () => {
        dataTable.resetSelectionRows();
      },
    });
  };

  return (
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

      <ActionGetCertification
        id={id!}
        disabled={!actionsEmployeesModule['find_certification_employee']}
      />

      <ActionViewRecord
        id={id!}
        disabled={!actionsEmployeesModule['find_one_employee']}
      />
    </DropDownMenuActions>
  );
};
