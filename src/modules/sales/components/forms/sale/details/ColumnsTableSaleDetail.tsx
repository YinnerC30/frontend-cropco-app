import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { SaleDetail } from '@/modules/sales/interfaces';
import { FormatNumber } from '@/modules/core/helpers';

export const columnsSaleDetail: ColumnDef<SaleDetail>[] = [
  {
    accessorKey: 'client.full_name',
    header: ({ column }: HeaderContext<SaleDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Cliente:'} />;
    },
  },
  {
    accessorKey: 'crop.name',
    header: ({ column }: HeaderContext<SaleDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Cultivo:'} />;
    },
  },
  {
    accessorKey: 'amount',
    cell: ({ row }) => {
      const amount: number = row.getValue('amount');
      return FormatNumber(amount);
    },
    header: ({ column }: HeaderContext<SaleDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Cantidad:'} />;
    },
  },
  {
    accessorKey: 'unit_of_measure',
    header: ({ column }: HeaderContext<SaleDetail, unknown>) => {
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
    header: ({ column }: HeaderContext<SaleDetail, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={'Total:'} className="mr-4" />
      );
    },
  },

  {
    accessorKey: 'is_receivable',
    cell: ({ row }) => {
      const value = row.getValue('is_receivable');
      return (
        <div className="flex justify-center ">
          {value ? (
            <Badge variant={'destructive'}>SI</Badge>
          ) : (
            <Badge variant={'success'}>NO</Badge>
          )}
        </div>
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
