import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { FormatNumber } from '@/modules/core/helpers/formatting/FormatNumber';
import { TableHarvest } from '../../interfaces/TableHarvest';
import { formFieldsHarvest } from '../../utils';
import { Badge } from '@/components';

export const columnsHarvest: ColumnDef<TableHarvest>[] = [
  {
    accessorKey: formFieldsHarvest.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue('date') });
    },
    header: ({ column }: HeaderContext<TableHarvest, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.date.label}
        />
      );
    },
  },
  {
    accessorKey: 'crop.name',
    header: ({ column }: HeaderContext<TableHarvest, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.crop.label}
        />
      );
    },
  },
  {
    accessorKey: 'employees',
    header: ({ column }: HeaderContext<TableHarvest, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Empleados:'} />;
    },
    cell: ({ row: { original } }) => {
      return original.employees.map((employee, index) => (
        <Badge key={employee?.id! + index} className="mb-1 mr-1">
          {employee.first_name}
        </Badge>
      ));
    },
  },
  {
    accessorKey: formFieldsHarvest.total.name,
    cell: ({ row }) => {
      return FormatNumber(row.getValue('total'));
    },
    header: ({ column }: HeaderContext<TableHarvest, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.total.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsHarvest.value_pay.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<TableHarvest, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.value_pay.label}
        />
      );
    },
  },
];

export default columnsHarvest;
