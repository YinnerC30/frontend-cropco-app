import { Button } from '@/components/ui/button';

import { ArrowUpDown } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';

import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { FormatNumber } from '@/modules/core/helpers/formatting/FormatNumber';
import { HarvestDetail } from '../../interfaces/HarvestDetail';
import { ActionsTableHarvestDetail } from './ActionsTableHarvestDetail';

export const columnsHarvestDetail: ColumnDef<HarvestDetail>[] = [
  {
    accessorKey: 'employee.first_name',
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {'Empleado:'}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'total',
    cell: ({ row }) => {
      return FormatNumber(row.getValue('total'));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {'Total cosechado:'}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'value_pay',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {'Valor a pagar:'}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];

export const columnsHarvestDetailActions = [
  ...columnsHarvestDetail,
  {
    id: 'actions',
    cell: ({ row }: any) => {
      const harvestDetail = row.original;

      return <ActionsTableHarvestDetail harvestDetail={harvestDetail} />;
    },
  },
];

export default {
  columnsHarvestDetail,
  columnsHarvestDetailActions,
};
