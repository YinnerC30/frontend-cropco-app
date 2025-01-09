import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';

import { Badge } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';
import { Work } from '@/modules/work/interfaces/Work';

export const columnsPaymentsPendingWork: ColumnDef<WorkDetail>[] = [
  {
    accessorKey: 'work',
    cell: ({ row }) => {
      const work = row?.getValue('work') as Work;
      if (work) {
        return FormatDate({ date: work.date });
      }
      return null;
    },
    header: ({ column }: HeaderContext<WorkDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Fecha'} />;
    },
  },

  {
    accessorKey: 'value_pay',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<WorkDetail, unknown>) => {
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
    header: ({ column }: HeaderContext<WorkDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Pago pendiente'} />;
    },
  },
];
