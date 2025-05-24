

import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';

import { Badge } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { Payment } from '../../interfaces/Payment';
import { formFieldsPayments } from '../../utils';
import { ActionsTablePayment } from './ActionsTablePayment';

export const columnsPayment: ColumnDef<Payment>[] = [
  {
    accessorKey: formFieldsPayments.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue('date') });
    },

    header: ({ column }: HeaderContext<Payment, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsPayments.date.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsPayments.employee.name,
    cell: ({ row }) => {
      const employee: any = row.getValue('employee');
      return employee.first_name;
    },
    header: ({ column }: HeaderContext<Payment, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsPayments.employee.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsPayments.method_of_payment.name,
    cell: ({ row }) => {
      const methodOfPayment = row.getValue('method_of_payment');
      let badge;
      switch (methodOfPayment) {
        case 'EFECTIVO':
          badge = <Badge variant={'success'}>Efectivo</Badge>;
          break;
        case 'TRANSFERENCIA':
          badge = <Badge variant={'destructive'}>Transferencia</Badge>;
          break;
        case 'INTERCAMBIO':
          badge = <Badge variant={'default'}>Intercambio</Badge>;
          break;
        default:
          break;
      }
      return badge;
    },
    header: ({ column }: HeaderContext<Payment, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsPayments.method_of_payment.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsPayments.value_pay.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<Payment, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsPayments.value_pay.label}
        />
      );
    },
  },
  {
    id: 'actions',
    cell: ActionsTablePayment,
  },
];

export default columnsPayment;
