import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatNumber } from '@/modules/core/helpers';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { ShoppingDetail } from '@/modules/shopping/interfaces';

export const columnsShoppingDetail: ColumnDef<ShoppingDetail>[] = [
  {
    accessorKey: 'supplier.full_name',
    header: ({ column }: HeaderContext<ShoppingDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Proveedor:'} />;
    },
  },
  {
    accessorKey: 'supply.name',
    header: ({ column }: HeaderContext<ShoppingDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Insumo:'} />;
    },
  },

  {
    accessorKey: 'amount',
    cell: ({ row }) => {
      return FormatNumber(row.getValue('amount'));
    },
    header: ({ column }: HeaderContext<ShoppingDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Monto:'} />;
    },
  },
  {
    accessorKey: 'unit_of_measure',
    header: ({ column }: HeaderContext<ShoppingDetail, unknown>) => {
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
    accessorKey: 'value_pay',
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<ShoppingDetail, unknown>) => {
      return <ButtonHeaderTable column={column} label={'Valor a pagar:'} />;
    },
  },
];

export default {
  columnsShoppingDetail,
};
