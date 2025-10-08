import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate, FormatNumber } from '@/modules/core/helpers';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';

export const columnsSaleDetailCrop: ColumnDef<any>[] = [
  {
    accessorKey: 'sale.date',
    header: ({ column }: HeaderContext<any, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Fecha:'} />;
    },
    cell: ({ row }) => {
      const dateSale = row.original.sale.date;
      return FormatDate({ date: dateSale });
    },
  },
  // {
  //   accessorKey: 'client.full_name',
  //   header: ({ column }: HeaderContext<any, unknown>) => {
  //     return <ButtonHeaderTable column={column} label={'Empleado:'} />;
  //   },
  // },
  {
    accessorKey: 'amount',
    cell: ({ row }) => {
      const amount: number = row.getValue('amount');
      return FormatNumber(amount);
    },
    header: ({ column }: HeaderContext<any, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Cantidad vendida:'} />;
    },
  },
  {
    accessorKey: 'unit_of_measure',
    header: ({ column }: HeaderContext<any, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Unidad de medida:'} />;
    },
    cell: ({ row }) => {
      const unitOfMeasure: any = row.original.unit_of_measure;
      return <Badge variant={'zinc'}>{unitOfMeasure}</Badge>;
    },
  },
  {
    accessorKey: 'value_pay',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<any, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Valor a pagar:'} />;
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
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Pago pendiente'} />;
    },
  },
];

export default {
  columnsSaleDetailCrop,
};
