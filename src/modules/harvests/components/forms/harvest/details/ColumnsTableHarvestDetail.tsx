import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { HarvestDetail } from '@/modules/harvests/interfaces';

export const columnsHarvestDetail: ColumnDef<HarvestDetail>[] = [
  {
    accessorKey: 'employee.full_name',
    header: ({ column }: HeaderContext<HarvestDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Empleado:'} />;
    },
  },
  {
    accessorKey: 'amount',
    cell: ({ row }) => {
      const amount: number = row.getValue('amount');
      return Number.isInteger(amount) ? amount : amount.toFixed(2);
    },
    header: ({ column }: HeaderContext<HarvestDetail, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={'Cantidad cosechada:'} />
      );
    },
  },
  {
    accessorKey: 'unit_of_measure',
    header: ({ column }: HeaderContext<HarvestDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Unidad de medida:'} />;
    },
    cell: ({ row }) => {
      const unitOfMeasure: any = row.original.unit_of_measure;
      return (
        <Badge variant={unitOfMeasure === 'GRAMOS' ? 'lime' : 'cyan'}>
          {unitOfMeasure}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'value_pay',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<HarvestDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Valor a pagar:'} />;
    },
  },
];

export default {
  columnsHarvestDetail,
};
