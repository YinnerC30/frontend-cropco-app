import { ButtonHeaderTable } from '@/modules/core/components';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components';

import { formFieldsEmployee } from '../../utils';
import { Employee } from '../../interfaces/Employee';
import { EmployeesModuleActionsTable } from './EmployeesModuleActionsTable';

export const createColumnsTableEmployees = (
  actionsInFirstColumn: boolean
): ColumnDef<Employee>[] => {
  const columns: ColumnDef<Employee>[] = [
    {
      id: 'select',
      header: ({ table }: any) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="-ml-[6px] mr-2"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: formFieldsEmployee.first_name.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsEmployee.first_name.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsEmployee.last_name.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsEmployee.last_name.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsEmployee.email.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsEmployee.email.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsEmployee.cell_phone_number.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsEmployee.cell_phone_number.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsEmployee.address.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsEmployee.address.label}
          />
        );
      },
    },
  ];

  const actions = {
    id: 'actions',
    cell: EmployeesModuleActionsTable,
  };

  actionsInFirstColumn ? columns.unshift(actions) : columns.push(actions);

  return columns;
};

export default createColumnsTableEmployees;
