import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { ShoppingSupplies } from '../../interfaces';
import { formFieldsShopping } from '../../utils/formFieldsShopping';
import { Badge } from '@/components';

export const columnsShopping: ColumnDef<ShoppingSupplies>[] = [
  {
    accessorKey: formFieldsShopping.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue('date') });
    },
    header: ({ column }: HeaderContext<ShoppingSupplies, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsShopping.date.label}
        />
      );
    },
  },

  {
    accessorKey: 'supplies',
    header: ({ column }) => {
      return <ButtonHeaderTable column={column} label={'Insumos:'} />;
    },
    cell: ({ row: { original } }) => {
      const setSupplies = new Set(
        original.details.map((item) => item.supply.name)
      );

      const iterator = Array.from(setSupplies);

      return iterator.map((name, index) => (
        <Badge key={name + index} className="mb-1 mr-1">
          {name}
        </Badge>
      ));
    },
  },
  {
    accessorKey: 'suppliers',
    header: ({ column }) => {
      return <ButtonHeaderTable column={column} label={'Proveedores:'} />;
    },
    cell: ({ row: { original } }) => {
      const setSuppliers = new Set(
        original.details.map((item) => item.supplier.first_name)
      );

      const iterator = Array.from(setSuppliers);

      return iterator.map((name, index) => (
        <Badge key={name + index} className="mb-1 mr-1">
          {name}
        </Badge>
      ));
    },
  },

  {
    accessorKey: formFieldsShopping.total.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('total'));
    },
    header: ({ column }: HeaderContext<ShoppingSupplies, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsShopping.total.label}
        />
      );
    },
  },
];

export default columnsShopping;
