

import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { HarvestProcessed } from '../../../interfaces/HarvestProcessed';
import { formFieldsHarvestProcessed } from '../../../utils/formFieldsHarvestProcessed';
import { ActionsTableHarvestProcessed } from './ActionsTableHarvestProcessed';

export const columnsHarvestProcessed: ColumnDef<HarvestProcessed>[] = [
  {
    accessorKey: formFieldsHarvestProcessed.date.name,
    cell: ({ row }) => {
      const date: string = row.getValue(formFieldsHarvestProcessed.date.name);
      return FormatDate({ date });
    },
    header: ({ column }: HeaderContext<HarvestProcessed, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvestProcessed.date.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsHarvestProcessed.amount.name,
    cell: ({ row }) => {
      const amount: number = row.getValue('amount');
      return Number.isInteger(amount) ? amount : amount.toFixed(2);
    },
    header: ({ column }: HeaderContext<HarvestProcessed, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvestProcessed.amount.label}
        />
      );
    },
  },
  {
    accessorKey: 'unit_of_measure',
    header: ({ column }: HeaderContext<HarvestProcessed, unknown>) => {
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
  {
    id: 'actions',
    cell: ActionsTableHarvestProcessed,
  },
];

export default columnsHarvestProcessed;
