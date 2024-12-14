import { ColumnDef } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { SaleDetail } from '@/modules/sales/interfaces';

export const columnsSaleDetail: ColumnDef<SaleDetail>[] = [
  {
    accessorKey: 'client.first_name',
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Empleado:'} />;
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
    accessorKey: 'quantity',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('quantity'));
    },
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Cantidad:'} />;
    },
  },
];

export default {
  columnsSaleDetail,
};
