import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ConsumptionDetails } from '@/modules/consumption/interfaces';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatNumber } from '@/modules/core/helpers';
import { Badge } from '@/components';

export const columnsConsumptionDetail: ColumnDef<ConsumptionDetails>[] = [
  {
    accessorKey: 'supply.name',
    header: ({ column }: HeaderContext<ConsumptionDetails, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Insumo:'} />;
    },
  },
  {
    accessorKey: 'crop.name',
    header: ({ column }: HeaderContext<ConsumptionDetails, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Cultivo:'} />;
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
  {
    accessorKey: 'unit_of_measure',
    header: ({ column }: HeaderContext<ConsumptionDetails, unknown>) => {
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
];

export default {
  columnsConsumptionDetail,
};
