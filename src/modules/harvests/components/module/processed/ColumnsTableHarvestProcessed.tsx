import { Button } from '@/components/ui/button';

import { ArrowUpDown } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';

import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatNumber } from '@/modules/core/helpers/formatting/FormatNumber';
import { useDeleteHarvestProcessed } from '../../../hooks/mutations/useDeleteHarvestProcessed';
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
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {formFieldsHarvestProcessed.date.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsHarvestProcessed.total.name,
    cell: ({ row }) => {
      const total: number = row.getValue('total');
      return FormatNumber(total);
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {formFieldsHarvestProcessed.total.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }: any) => {
      const values = row.original;

      const { mutate } = useDeleteHarvestProcessed();

      return (
        <ActionsTableHarvestProcessed
          mutate={mutate}
          id={row.original.id}
          values={values}
        />
      );
    },
  },
];

export default columnsHarvestProcessed;
