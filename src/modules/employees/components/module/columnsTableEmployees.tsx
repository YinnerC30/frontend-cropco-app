import { ButtonHeaderTable } from '@/modules/core/components';
import { formFieldsEmployee } from '../../utils';
import { ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Employee } from '../../interfaces/Employee';

export const columnsTableEmployees: ColumnDef<Employee>[] = [
  {
    accessorKey: formFieldsEmployee.first_name.name,
    header: ({ column }: HeaderContext<Employee, unknown>) => {
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
    header: ({ column }: HeaderContext<Employee, unknown>) => {
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
    header: ({ column }: HeaderContext<Employee, unknown>) => {
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
    header: ({ column }: HeaderContext<Employee, unknown>) => {
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
    header: ({ column }: HeaderContext<Employee, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsEmployee.address.label}
        />
      );
    },
  },
];
