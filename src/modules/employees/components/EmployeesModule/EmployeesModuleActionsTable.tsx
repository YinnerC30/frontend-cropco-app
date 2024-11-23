import { useAuthorization } from '@/modules/authentication/hooks';

import { Button, DropdownMenuItem } from '@/components';
import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord
} from '@/modules/core/components/DataTable/DataTableMenuActions/Actions';
import { DropDownMenuActions } from '@/modules/core/components/DataTable/DataTableMenuActions/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import { ShieldPlus } from 'lucide-react';
import { useDeleteEmployee } from '../../hooks/mutations/useDeleteEmployee';

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

  const handleCertificateEmployee = () => {
    window.open(
      `http://localhost:3000/employees/find/certification/one/${id}`,
      '_blank'
    );
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

      <DropdownMenuItem asChild>
        <Button variant={'ghost'} onClick={handleCertificateEmployee}>
          <ShieldPlus className="mr-1" /> Certificar
        </Button>
      </DropdownMenuItem>

      <ActionViewRecord
        id={id}
        disabled={!hasPermission('employees', 'find_one_employee')}
      />
    </DropDownMenuActions>
  );
};
