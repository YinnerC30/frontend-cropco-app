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
import { ActionGenerateCertification } from './ActionGenerateCertification';
import { EmployeeCertification } from '../../interfaces/EmployeeCertification';

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

  const handleDelete = () => {
    mutationDeleteEmployee.mutate(id!, {
      onSuccess: () => {
        dataTable.resetSelectionRows();
      },
    });
  };

  const demoData: EmployeeCertification = {
    generator_name: '',
    generator_position: '',
    company_name: '',
    start_date: new Date(),
    employee_position: '',
    weekly_working_hours: 0,
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

      <ActionGenerateCertification
        id={id!}
        disabled={!actionsEmployeesModule['generate_certification_employee']}
        data={demoData}
        mutation={mutationGenerateCertification}
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
