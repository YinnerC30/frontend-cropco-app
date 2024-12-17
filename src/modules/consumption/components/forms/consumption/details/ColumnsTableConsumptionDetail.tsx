import { ColumnDef } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { ConsumptionDetails } from '@/modules/consumption/interfaces';

export const columnsConsumptionDetail: ColumnDef<ConsumptionDetails>[] = [
  {
    accessorKey: 'crop.name',
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Cultivo:'} />;
    },
  },
  {
    accessorKey: 'supply.name',
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Suministro:'} />;
    },
  },
  {
    accessorKey: 'amount',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('amount'));
    },
    header: ({ column }: any) => {
      return <ButtonHeaderTable column={column} label={'Monto:'} />;
    },
  },
];

export default {
  columnsConsumptionDetail,
};
