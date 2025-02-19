import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable, ToolTipTemplate } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { FormatNumber } from '@/modules/core/helpers/formatting/FormatNumber';

import { formFieldsHarvest } from '../../utils';
import { Badge, Button } from '@/components';
import { Harvest, HarvestDetail } from '../../interfaces';

export const columnsHarvest: ColumnDef<Harvest>[] = [
  {
    accessorKey: formFieldsHarvest.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue('date') });
    },
    header: ({ column }: HeaderContext<Harvest, unknown>) => {
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
    header: ({ column }: HeaderContext<Harvest, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.crop.label}
        />
      );
    },
  },
  {
    accessorKey: 'details',
    header: ({ column }) => (
      <ButtonHeaderTable column={column} label="Empleados:" />
    ),
    cell: ({ row: { original } }) => {
      const employees = original.details.map(({ employee }) => employee);
      const maxVisible = 4;
      const hiddenCount = employees.length - maxVisible;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {employees.slice(0, maxVisible).map((employee, index) => (
            <Badge key={`${employee?.id}-${index}`} className="mb-1 mr-1">
              {employee.first_name}
            </Badge>
          ))}

          {hiddenCount > 0 && (
            <ToolTipTemplate
              content={employees
                .slice(maxVisible)
                .map((item) => item.first_name)
                .join(',\n')}
            >
              <Button className="h-4 py-3 text-xs font-semibold cursor-pointer">{`Otros... (${hiddenCount})`}</Button>
            </ToolTipTemplate>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: formFieldsHarvest.total.name,
    cell: ({ row }) => {
      return FormatNumber(row.getValue('total'));
    },
    header: ({ column }: HeaderContext<Harvest, unknown>) => {
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
    header: ({ column }: HeaderContext<Harvest, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.value_pay.label}
        />
      );
    },
  },
  {
    accessorKey: 'details',
    cell: ({ row }) => {
      const array: HarvestDetail[] = row.getValue('details') ?? [];
      const result = array.some((item) => item.payment_is_pending);
      return result ? (
        <Badge variant={'red'}>SI</Badge>
      ) : (
        <Badge variant={'indigo'}>NO</Badge>
      );
    },
    header: ({ column }: HeaderContext<Harvest, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={'¿Hay pagos pendientes?'} />
      );
    },
  },
];

export default columnsHarvest;
