import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable, ToolTipTemplate } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { ShoppingSupplies } from '../../interfaces';
import { formFieldsShopping } from '../../utils/formFieldsShopping';
import { Badge, Button } from '@/components';

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

      const supplies = Array.from(setSupplies);

      const maxVisible = 2;
      const hiddenCount = supplies.length - maxVisible;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {supplies.slice(0, maxVisible).map((supply, index) => (
            <Badge key={`${supply}-${index}`} className="mb-1 mr-1">
              {supply}
            </Badge>
          ))}

          {hiddenCount > 0 && (
            <ToolTipTemplate content={supplies.slice(maxVisible).join(',\n')}>
              <Button className="h-4 py-3 text-xs font-semibold cursor-pointer">{`Otros... (${hiddenCount})`}</Button>
            </ToolTipTemplate>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'suppliers',
    header: ({ column }) => {
      return <ButtonHeaderTable column={column} label={'Proveedores:'} />;
    },
    cell: ({ row: { original } }) => {
      const setSuppliers = new Set(
        original.details.map((item) => item.supplier.full_name)
      );

      const suppliers = Array.from(setSuppliers);

      const maxVisible = 2;
      const hiddenCount = suppliers.length - maxVisible;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {suppliers.slice(0, maxVisible).map((supplier, index) => (
            <Badge key={`${supplier}-${index}`} className="mb-1 mr-1">
              {supplier}
            </Badge>
          ))}

          {hiddenCount > 0 && (
            // <ToolTipTemplate content={suppliers.slice(maxVisible).join(',\n')}>
            <Button className="h-4 py-3 text-xs font-semibold cursor-pointer">{`Otros... (${hiddenCount})`}</Button>
            // </ToolTipTemplate>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: formFieldsShopping.value_pay.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<ShoppingSupplies, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsShopping.value_pay.label}
        />
      );
    },
  },
];

export default columnsShopping;
