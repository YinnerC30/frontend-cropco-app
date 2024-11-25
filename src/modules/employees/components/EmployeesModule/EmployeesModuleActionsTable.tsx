import { useAuthorization } from '@/modules/authentication/hooks';

import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/DataTable/DataTableMenuActions/Actions';
import { DropDownMenuActions } from '@/modules/core/components/DataTable/DataTableMenuActions/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { useDeleteEmployee } from '../../hooks/mutations/useDeleteEmployee';
import { ActionGetCertification } from './ActionGetCertification';

interface Props {
  row: Row<any>;
}

export const EmployeesModuleActionsTable = ({ row }: Props) => {
  const { hasPermission } = useAuthorization();
  const { id } = row.original;
  const mutationDeleteEmployee = useDeleteEmployee();

  const handleDelete = () => {
    mutationDeleteEmployee.mutate(id);
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />

      <ActionDeleteRecord
        action={handleDelete}
        disabled={!hasPermission('employees', 'remove_one_employee')}
      />

      <ActionModifyRecord
        id={id}
        disabled={!hasPermission('employees', 'update_one_employee')}
      />

      <ActionGetCertification
        id={id}
        disabled={!hasPermission('employees', 'find_certification_employee')}
      />

      <ActionViewRecord
        id={id}
        disabled={!hasPermission('employees', 'find_one_employee')}
      />
    </DropDownMenuActions>
  );
};
