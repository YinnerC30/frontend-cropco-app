import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { FormatNumber } from '@/modules/core/helpers/formatting/FormatNumber';
import { HarvestDetail } from '@/modules/harvests/interfaces';

export const columnsPaymentsPendingHarvest: ColumnDef<HarvestDetail>[] = [
  {
    accessorKey: 'harvest',
    cell: ({ row }: any) => {
      const { date } = row?.getValue('harvest');
      if (date) {
        return FormatDate({ date });
      }
      return null;
    },
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Fecha'} />;
    },
  },
  {
    accessorKey: 'value_pay',
    cell: ({ row }) => {
      return FormatNumber(row.getValue('value_pay'));
    },
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Valor a pagar'} />;
    },
  },
  {
    accessorKey: 'value_pay',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: any) => {
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
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Pago pendiente'} />;
    },
  },
];
