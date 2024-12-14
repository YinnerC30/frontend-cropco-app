import { ColumnDef } from '@tanstack/react-table';

import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { formFieldsSale } from '../../utils/formFieldsSale';
import { Badge, Button } from '@/components';
import { ArrowUpDown } from 'lucide-react';
import { FormatNumber } from '@/modules/core/helpers';

export const columnsSale: ColumnDef<any>[] = [
  {
    accessorKey: formFieldsSale.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue('date') });
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {formFieldsSale.date.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
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
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {formFieldsSale.quantity.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
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
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total:
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];

export default columnsSale;
