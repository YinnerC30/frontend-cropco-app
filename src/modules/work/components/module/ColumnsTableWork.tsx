import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge, Button } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { Crop } from '@/modules/crops/interfaces/Crop';
import { Work } from '../../interfaces/Work';
import { WorkDetail } from '../../interfaces/WorkDetail';
import { formFieldsWork } from '../../utils/formFieldsWork';

export const columnsWork: ColumnDef<Work>[] = [
  {
    accessorKey: formFieldsWork.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue('date') });
    },
    header: ({ column }: HeaderContext<Work, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsWork.date.label} />
      );
    },
  },
  {
    accessorKey: formFieldsWork.crop.name,
    cell: ({ row }) => {
      const crop: Crop = row.getValue('crop');
      return crop.name;
    },
    header: ({ column }: HeaderContext<Work, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsWork.crop.label} />
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
              {employee.full_name}
            </Badge>
          ))}

          {hiddenCount > 0 && (
            // <ToolTipTemplate
            //   content={employees
            //     .slice(maxVisible)
            //     .map((item) => item.first_name)
            //     .join(',\n')}
            // >
              <Button className="h-4 py-3 text-xs font-semibold cursor-pointer">{`Otros... (${hiddenCount})`}</Button>
            // </ToolTipTemplate>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: formFieldsWork.description.name,
    cell: ({ row }) => {
      return row.getValue('description');
    },
    header: ({ column }: HeaderContext<Work, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsWork.description.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsWork.value_pay.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<Work, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsWork.value_pay.label} />
      );
    },
  },
  {
    id: 'work_payment_pending_status',
    accessorKey: 'details',
    cell: ({ row }) => {
      const array: WorkDetail[] = row.getValue('details') ?? [];
      const result = array.some((item) => item.payment_is_pending);
      return result ? (
        <Badge variant={'red'}>SI</Badge>
      ) : (
        <Badge variant={'indigo'}>NO</Badge>
      );
    },
    header: ({ column }: HeaderContext<Work, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={'¿Hay pagos pendientes?'} />
      );
    },
  },
];

export default columnsWork;
