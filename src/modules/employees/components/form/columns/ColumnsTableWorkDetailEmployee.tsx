import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { Work } from '@/modules/work/interfaces/Work';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';
import { Badge } from '@/components';

export const columnsWorkDetailEmployee: ColumnDef<any>[] = [
  {
    accessorKey: 'work.date',
    header: ({ column }: HeaderContext<Work, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Fecha:'} />;
    },
    cell: ({ row }) => {
      const dateWork = row.original.work.date;
      return FormatDate({ date: dateWork });
    },
  },
  {
    accessorKey: 'employee.full_name',
    header: ({ column }: HeaderContext<WorkDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Empleado:'} />;
    },
  },
  {
    accessorKey: 'value_pay',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<WorkDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Valor a pagar:'} />;
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

export default {
  columnsWorkDetailEmployee,
};
