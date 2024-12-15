import { ColumnDef } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatNumber } from '@/modules/core/helpers';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { formFieldsSale } from '../../utils/formFieldsSale';

export const columnsSale: ColumnDef<any>[] = [
  {
    accessorKey: formFieldsSale.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue('date') });
    },
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsSale.date.label} />
      );
    },
  },
  {
    accessorKey: formFieldsSale.quantity.name,
    cell: ({ row }) => {
      return FormatNumber(row.getValue('quantity'));
    },
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSale.quantity.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSale.total.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('total'));
    },
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsSale.total.label} />
      );
    },
  },
];

export default columnsSale;
