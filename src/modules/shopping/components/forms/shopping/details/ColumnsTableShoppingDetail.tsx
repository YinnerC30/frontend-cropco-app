import { ColumnDef } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { ShoppingDetail } from '@/modules/shopping/interfaces';

export const columnsShoppingDetail: ColumnDef<ShoppingDetail>[] = [
  {
    accessorKey: 'supplier.first_name',
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Empleado:'} />;
    },
  },
  {
    accessorKey: 'supply.name',
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Cultivo:'} />;
    },
  },
  {
    accessorKey: 'total',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('total'));
    },
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Total:'} />;
    },
  },
  {
    accessorKey: 'amount',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('amount'));
    },
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Cantidad:'} />;
    },
  },
];

export default {
  columnsShoppingDetail,
};
