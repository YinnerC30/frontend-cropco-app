import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge } from '@/components';
import { ConsumptionDetails } from '@/modules/consumption/interfaces';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatNumber } from '@/modules/core/helpers';
import {
  unitTypeMap
} from '@/modules/core/hooks/useUnitConverter';
import {
  CategoriesUnitOfMeasure,
  UnitOfMeasure,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { getBadgeColor } from '@/modules/supplies/utils/getBadgeColor';

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
      return <ButtonHeaderTable column={column} label={'Cantidad:'} />;
    },
  },
  {
    accessorKey: 'unit_of_measure',
    header: ({ column }: HeaderContext<ConsumptionDetails, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Unidad de medida:'} />;
    },
    cell: ({ row }) => {
      const unitOfMeasure: any = row.original.unit_of_measure;
      const unit = unitTypeMap[
        unitOfMeasure as UnitOfMeasure
      ].toUpperCase() as CategoriesUnitOfMeasure;
      const variantColor = getBadgeColor(unit) as any;
      return <Badge variant={variantColor}>{unitOfMeasure}</Badge>;
    },
  },
];

export default {
  columnsConsumptionDetail,
};
