import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { Work } from '../../interfaces/Work';
import { formFieldsWork } from '../../utils/formFieldsWork';
import { Crop } from '@/modules/crops/interfaces/Crop';

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
];

export default columnsWork;
