import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { RecordToPay } from '../../interfaces/RecordToPay';

export const columnsPaymentsToPay: ColumnDef<RecordToPay>[] = [
  {
    accessorKey: 'date',
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue('date') });
    },
    header: ({ column }: HeaderContext<RecordToPay, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Fecha'} />;
    },
  },
  {
    accessorKey: 'value_pay',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<RecordToPay, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Valor a pagar'} />;
    },
  },
  {
    accessorKey: 'payment_is_pending',
    cell: ({ row }) => {
      const value = row.getValue('payment_is_pending');
      return value ? (
        <Badge variant={'destructive'}>SI</Badge>
      ) : (
        <Badge variant={'success'}>NO</Badge>
      );
    },
    header: ({ column }: HeaderContext<RecordToPay, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Pago pendiente'} />;
    },
  },
  {
    accessorKey: 'type',
    cell: ({ row }) => {
      const value = row.getValue('type');
      return value === 'harvest' ? (
        <Badge variant={'lime'}>Cosecha</Badge>
      ) : (
        <Badge variant={'orange'}>Trabajo</Badge>
      );
    },
    header: ({ column }: HeaderContext<RecordToPay, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Categoria de pago'} />;
    },
  },
];
