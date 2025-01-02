import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { SaleDetail } from '@/modules/sales/interfaces';

export const columnsSaleDetail: ColumnDef<SaleDetail>[] = [
  {
    accessorKey: 'client.first_name',
    header: ({ column }: HeaderContext<SaleDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Empleado:'} />;
    },
  },
  {
    accessorKey: 'crop.name',
    header: ({ column }: HeaderContext<SaleDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Cultivo:'} />;
    },
  },
  {
    accessorKey: 'total',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('total'));
    },
    header: ({ column }: HeaderContext<SaleDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Total:'} />;
    },
  },
  {
    accessorKey: 'quantity',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('quantity'));
    },
    header: ({ column }: HeaderContext<SaleDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Cantidad:'} />;
    },
  },
  {
    accessorKey: 'is_receivable',
    cell: ({ row }) => {
      const value = row.getValue('is_receivable');
      return value ? (
        <Badge variant={'destructive'}>SI</Badge>
      ) : (
        <Badge variant={'success'}>NO</Badge>
      );
    },
    header: ({ column }: HeaderContext<SaleDetail, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={'¿Pediente de pago?:'} />
      );
    },
  },
];

export default {
  columnsSaleDetail,
};
