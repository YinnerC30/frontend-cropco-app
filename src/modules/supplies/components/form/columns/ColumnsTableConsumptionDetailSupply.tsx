import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge } from '@/components';
import {
  ConsumptionDetails,
  ConsumptionSupplies,
} from '@/modules/consumption/interfaces';
import { formFieldsConsumption } from '@/modules/consumption/utils';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate, FormatNumber } from '@/modules/core/helpers';
import {
  unitTypeMap
} from '@/modules/core/hooks/useUnitConverter';
import { UnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';
import { getBadgeColor } from '@/modules/supplies/utils/getBadgeColor';

export const columnsConsumptionDetailSupply: ColumnDef<any>[] = [
  {
    accessorKey: 'consumption.date',
    cell: ({ row }) => {
      return FormatDate({ date: row.original.consumption.date });
    },
    header: ({ column }: HeaderContext<ConsumptionSupplies, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsConsumption.date.label}
        />
      );
    },
  },
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
      const unit = unitTypeMap[unitOfMeasure as UnitOfMeasure];
      const badgeVariant = getBadgeColor(unit);
      return <Badge variant={badgeVariant as any}>{unitOfMeasure}</Badge>;
    },
  },
];

export default {
  columnsConsumptionDetailSupply,
};
