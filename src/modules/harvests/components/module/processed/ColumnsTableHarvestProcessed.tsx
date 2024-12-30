

import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatNumber } from '@/modules/core/helpers/formatting/FormatNumber';
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
    accessorKey: formFieldsHarvestProcessed.total.name,
    cell: ({ row }) => {
      const total: number = row.getValue('total');
      return FormatNumber(total);
    },
    header: ({ column }: HeaderContext<HarvestProcessed, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvestProcessed.total.label}
        />
      );
    },
  },
  {
    id: 'actions',
    cell: ActionsTableHarvestProcessed,
  },
];

export default columnsHarvestProcessed;
