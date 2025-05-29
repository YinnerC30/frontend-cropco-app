import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';

export const columnsWorkDetail: ColumnDef<WorkDetail>[] = [
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
];

export default {
  columnsWorkDetail,
};
