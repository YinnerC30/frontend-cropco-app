import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { ShoppingSupplies } from '../../interfaces';
import { formFieldsShopping } from '../../utils/formFieldsShopping';

export const columnsShopping: ColumnDef<ShoppingSupplies>[] = [
  {
    accessorKey: formFieldsShopping.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue('date') });
    },
    header: ({ column }: HeaderContext<ShoppingSupplies, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsShopping.date.label}
        />
      );
    },
  },

  {
    accessorKey: formFieldsShopping.total.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('total'));
    },
    header: ({ column }: HeaderContext<ShoppingSupplies, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsShopping.total.label}
        />
      );
    },
  },
];

export default columnsShopping;
