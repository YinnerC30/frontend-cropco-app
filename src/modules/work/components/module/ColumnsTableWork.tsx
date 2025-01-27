import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { Crop } from '@/modules/crops/interfaces/Crop';
import { Work } from '../../interfaces/Work';
import { formFieldsWork } from '../../utils/formFieldsWork';
import { WorkDetail } from '../../interfaces/WorkDetail';

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
    header: ({ column }) => {
      return <ButtonHeaderTable column={column} label={'Empleados:'} />;
    },
    cell: ({ row: { original } }) => {
      return original.details.map(({ employee }, index) => (
        <Badge key={employee?.id! + index} className="mb-1 mr-1">
          {employee.first_name}
        </Badge>
      ));
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
    accessorKey: formFieldsWork.total.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('total'));
    },
    header: ({ column }: HeaderContext<Work, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsWork.total.label} />
      );
    },
  },
  {
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
