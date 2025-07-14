import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge } from '@/components';
import { ConsumptionDetails, ConsumptionSupplies } from '@/modules/consumption/interfaces';
import { formFieldsConsumption } from '@/modules/consumption/utils';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate, FormatNumber } from '@/modules/core/helpers';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';

export const columnsConsumptionDetailCrop: ColumnDef<any>[] = [
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
      const { getUnitType } = useUnitConverter();
      const unitOfMeasure: any = row.original.unit_of_measure;
      const unit = getUnitType(unitOfMeasure);
      return (
        <Badge variant={unit === 'mass' ? 'zinc' : 'blue'}>
          {unitOfMeasure}
        </Badge>
      );
    },
  },
];

export default {
  columnsConsumptionDetailCrop,
};
