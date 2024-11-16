import { Button } from '@/components/ui/button';

import { ArrowUpDown } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';

import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { FormatNumber } from '@/modules/core/helpers/formatting/FormatNumber';

import { ShoppingDetails } from '../../interfaces/ShoppingDetails';
import { ActionsTableShoppingDetail } from './ActionsTableShoppingDetail';

export const columnsShoppingDetail: ColumnDef<ShoppingDetails>[] = [
  {
    accessorKey: 'supply.name',
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {'Insumo:'}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'supplier.first_name',
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {'Proveedor:'}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'amount',
    cell: ({ row }) => {
      return FormatNumber(row.getValue('amount'));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {'Valor a comprar:'}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'total',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('total'));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {'Total a pagar:'}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];

export const columnsShoppingDetailActions = [
  ...columnsShoppingDetail,
  {
    id: 'actions',
    cell: ({ row }: any) => {
      const shoppingDetail = row.original;

      return <ActionsTableShoppingDetail shoppingDetail={shoppingDetail} />;
    },
  },
];

export default {
  columnsShoppingDetail,
  columnsShoppingDetailActions,
};
