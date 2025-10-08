import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { Crop } from '@/modules/crops/interfaces/Crop';
import { Work } from '@/modules/work/interfaces/Work';
import { formFieldsWork } from '@/modules/work/utils/formFieldsWork';

export const columnsWorkCrop: ColumnDef<Work>[] = [
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
    accessorKey: formFieldsWork.value_pay.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<Work, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsWork.value_pay.label}
        />
      );
    },
  },
];

export default columnsWorkCrop;
