import { ColumnDef } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { FormatNumber } from '@/modules/core/helpers/formatting/FormatNumber';
import { HarvestDetail } from '@/modules/harvests/interfaces';

export const columnsHarvestDetail: ColumnDef<HarvestDetail>[] = [
  {
    accessorKey: 'employee.first_name',
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Empleado:'} />;
    },
  },
  {
    accessorKey: 'total',
    cell: ({ row }) => {
      return FormatNumber(row.getValue('total'));
    },
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Total cosechado:'} />;
    },
  },
  {
    accessorKey: 'value_pay',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Valor a pagar:'} />;
    },
  },
];

export default {
  columnsHarvestDetail,
};
