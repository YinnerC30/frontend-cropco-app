import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge, Button } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { PersonHoverCard } from '@/modules/core/components/card/PersonHoverCard';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { SupplyHoverCard } from '@/modules/supplies/components/card/SupplyHoverCard';
import { ShoppingSupplies } from '../../interfaces';
import { formFieldsShopping } from '../../utils/formFieldsShopping';
import { MODULE_SUPPLIER_PATHS } from '@/modules/suppliers/routes/pathRoutes';

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
      // Usar un Map para filtrar insumos únicos por id y conservar el objeto completo
      const supplyMap = new Map();
      original.details.forEach((item) => {
        const supply = item.supply;
        if (supply && !supplyMap.has(supply.id)) {
          supplyMap.set(supply.id, supply);
        }
      });
      const supplies = Array.from(supplyMap.values());

      const maxVisible = 2;
      const hiddenCount = supplies.length - maxVisible;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {supplies.slice(0, maxVisible).map((supply, index) => (
            <SupplyHoverCard data={supply as any} key={`${supply.id}-${index}`}>
              <Badge className="mb-1 mr-1" variant={'cyan'}>
                {supply.name}
              </Badge>
            </SupplyHoverCard>
          ))}

          {hiddenCount > 0 && (
            <Button className="h-4 py-3 text-xs font-semibold cursor-pointer">{`Otros... (${hiddenCount})`}</Button>
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
      // Usar un Map para filtrar proveedores únicos por id y conservar el objeto completo
      const supplierMap = new Map();
      original.details.forEach((item) => {
        const supplier = item.supplier;
        if (supplier && !supplierMap.has(supplier.id)) {
          supplierMap.set(supplier.id, supplier);
        }
      });
      const suppliers = Array.from(supplierMap.values());

      const maxVisible = 2;
      const hiddenCount = suppliers.length - maxVisible;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {suppliers.slice(0, maxVisible).map((supplier, index) => (
            <PersonHoverCard
              key={`${supplier.id}-${index}`}
              data={supplier as any}
              routeToNavigate={MODULE_SUPPLIER_PATHS.ViewOne + supplier.id}
            >
              <Badge className="mb-1 mr-1" variant={'orange'}>
                {supplier.full_name}
              </Badge>
            </PersonHoverCard>
          ))}

          {hiddenCount > 0 && (
            <Button className="h-4 py-3 text-xs font-semibold cursor-pointer">{`Otros... (${hiddenCount})`}</Button>
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
