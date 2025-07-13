import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { HarvestDetailEmployee } from '@/modules/employees/interfaces/HarvestDetailEmployee';

export const columnsHarvestDetailEmployee: ColumnDef<HarvestDetailEmployee>[] =
  [
    {
      accessorKey: 'harvest.date',
      header: ({ column }: HeaderContext<HarvestDetailEmployee, unknown>) => {
        return <ButtonHeaderTable column={column} label={'Fecha:'} />;
      },
      cell: ({ row }) => {
        const dateHarvest = row.original.harvest.date;
        return FormatDate({ date: dateHarvest });
      },
    },
    {
      accessorKey: 'employee.full_name',
      header: ({ column }: HeaderContext<HarvestDetailEmployee, unknown>) => {
        return <ButtonHeaderTable column={column} label={'Empleado:'} />;
      },
    },
    {
      accessorKey: 'amount',
      cell: ({ row }) => {
        const amount: number = row.getValue('amount');
        return Number.isInteger(amount) ? amount : amount.toFixed(2);
      },
      header: ({ column }: HeaderContext<HarvestDetailEmployee, unknown>) => {
        return (
          <ButtonHeaderTable column={column} label={'Cantidad cosechada:'} />
        );
      },
    },
    {
      accessorKey: 'unit_of_measure',
      header: ({ column }: HeaderContext<HarvestDetailEmployee, unknown>) => {
        return (
          <ButtonHeaderTable column={column} label={'Unidad de medida:'} />
        );
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
      header: ({ column }: HeaderContext<HarvestDetailEmployee, unknown>) => {
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
  columnsHarvestDetailEmployee,
};
