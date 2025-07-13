import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';

import { FormatNumber } from '@/modules/core/helpers';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { Harvest } from '@/modules/harvests/interfaces';
import { formFieldsHarvest } from '@/modules/harvests/utils';
import {
  MassUnitOfMeasure,
  UnitSymbols,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { Badge } from '@/components';

export const columnsHarvestCrop: ColumnDef<Harvest>[] = [
  {
    accessorKey: formFieldsHarvest.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue('date') });
    },
    header: ({ column }: HeaderContext<Harvest, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.date.label}
        />
      );
    },
  },
  {
    accessorKey: 'crop.name',
    header: ({ column }: HeaderContext<Harvest, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.crop.label}
        />
      );
    },
  },

  {
    accessorKey: formFieldsHarvest.amount.name,
    cell: ({ row }) => {
      const rawValue = row.original.amount ?? 0;

      const { convert } = useUnitConverter();

      const convertedValue = convert(
        rawValue,
        MassUnitOfMeasure.GRAMOS,
        MassUnitOfMeasure.KILOGRAMOS
      );
      const symbolToShow = UnitSymbols[MassUnitOfMeasure.KILOGRAMOS];

      return (
        <div className="flex items-center gap-2">
          <span>{FormatNumber(convertedValue)}</span>
          <Badge variant={'zinc'}>{symbolToShow}</Badge>
        </div>
      );
    },
    header: ({ column }: HeaderContext<Harvest, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.amount.label}
        />
      );
    },
  },

  {
    accessorKey: formFieldsHarvest.value_pay.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<Harvest, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.value_pay.label}
        />
      );
    },
  },
];

export default columnsHarvestCrop;
