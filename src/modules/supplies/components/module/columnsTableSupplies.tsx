import { ButtonHeaderTable } from '@/modules/core/components';

import { Badge } from '@/components';

import { ColumnDef, HeaderContext, Row } from '@tanstack/react-table';
import { Supply } from '../../interfaces/Supply';
import { formFieldsSupply } from '../../utils';
import { FormatNumber } from '@/modules/core/helpers';

export const columnsTableSupplies: ColumnDef<Supply>[] = [
  {
    accessorKey: formFieldsSupply.name.name,
    header: ({ column }: HeaderContext<Supply, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupply.name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupply.brand.name,
    header: ({ column }: HeaderContext<Supply, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupply.brand.label}
        />
      );
    },
  },

  {
    accessorKey: formFieldsSupply.observation.name,
    header: ({ column }: HeaderContext<Supply, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupply.observation.label}
        />
      );
    },
  },
  {
    accessorKey: 'stock.amount',
    cell: ({ row }: { row: Row<Supply> }) => {
      return FormatNumber(row.original?.stock?.amount ?? 0);
    },
    header: ({ column }: HeaderContext<Supply, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Inventario actual:'} />;
    },
  },
  {
    accessorKey: formFieldsSupply.unit_of_measure.name,
    header: ({ column }: HeaderContext<Supply, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupply.unit_of_measure.label}
        />
      );
    },
    cell: ({ row }: { row: Row<Supply> }) => {
      const unitOfMeasure: string = row.getValue('unit_of_measure');
      return (
        <Badge variant={unitOfMeasure === 'GRAMOS' ? 'lime' : 'cyan'}>
          {unitOfMeasure}
        </Badge>
      );
    },
  },
];
