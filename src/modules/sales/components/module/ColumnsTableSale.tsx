import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatNumber } from '@/modules/core/helpers';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { Sale } from '../../interfaces';
import { formFieldsSale } from '../../utils/formFieldsSale';
import { Badge } from '@/components';

export const columnsSale: ColumnDef<Sale>[] = [
  {
    accessorKey: formFieldsSale.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue('date') });
    },
    header: ({ column }: HeaderContext<Sale, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsSale.date.label} />
      );
    },
  },

  {
    accessorKey: 'clients',
    header: ({ column }) => {
      return <ButtonHeaderTable column={column} label={'Clientes:'} />;
    },
    cell: ({ row: { original } }) => {
      return original.details.map(({ client }, index) => (
        <Badge key={client?.id! + index} className="mb-1 mr-1">
          {client.first_name}
        </Badge>
      ));
    },
  },
  {
    accessorKey: 'crops',
    header: ({ column }) => {
      return <ButtonHeaderTable column={column} label={'Cultivos:'} />;
    },
    cell: ({ row: { original } }) => {
      return original.details.map(({ crop }, index) => (
        <Badge key={crop?.id! + index} className="mb-1 mr-1">
          {crop.name}
        </Badge>
      ));
    },
  },
  {
    accessorKey: formFieldsSale.quantity.name,
    cell: ({ row }) => {
      return FormatNumber(row.getValue('quantity'));
    },
    header: ({ column }: HeaderContext<Sale, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSale.quantity.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSale.total.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('total'));
    },
    header: ({ column }: HeaderContext<Sale, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsSale.total.label} />
      );
    },
  },
];

export default columnsSale;
