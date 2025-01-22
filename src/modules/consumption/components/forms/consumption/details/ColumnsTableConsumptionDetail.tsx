import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ConsumptionDetails } from '@/modules/consumption/interfaces';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatNumber } from '@/modules/core/helpers';

export const columnsConsumptionDetail: ColumnDef<ConsumptionDetails>[] = [
  {
    accessorKey: 'crop.name',
    header: ({ column }: HeaderContext<ConsumptionDetails, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Cultivo:'} />;
    },
  },
  {
    accessorKey: 'supply.name',
    header: ({ column }: HeaderContext<ConsumptionDetails, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Suministro:'} />;
    },
  },
  {
    accessorKey: 'amount',
    cell: ({ row }) => {
      return FormatNumber(row.getValue('amount'));
    },
    header: ({ column }: HeaderContext<ConsumptionDetails, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Monto:'} />;
    },
  },
];

export default {
  columnsConsumptionDetail,
};
