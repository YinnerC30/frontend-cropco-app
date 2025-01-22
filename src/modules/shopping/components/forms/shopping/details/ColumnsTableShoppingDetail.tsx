import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { ShoppingDetail } from '@/modules/shopping/interfaces';
import { FormatNumber } from '@/modules/core/helpers';

export const columnsShoppingDetail: ColumnDef<ShoppingDetail>[] = [
  {
    accessorKey: 'supplier.first_name',
    header: ({ column }: HeaderContext<ShoppingDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Proveedor:'} />;
    },
  },
  {
    accessorKey: 'supply.name',
    header: ({ column }: HeaderContext<ShoppingDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Suministro:'} />;
    },
  },
  {
    accessorKey: 'amount',
    cell: ({ row }) => {
      return FormatNumber(row.getValue('amount'));
    },
    header: ({ column }: HeaderContext<ShoppingDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Monto:'} />;
    },
  },
  {
    accessorKey: 'total',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('total'));
    },
    header: ({ column }: HeaderContext<ShoppingDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Valor a pagar:'} />;
    },
  },
];

export default {
  columnsShoppingDetail,
};
