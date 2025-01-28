import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable, ToolTipTemplate } from '@/modules/core/components';
import { FormatNumber } from '@/modules/core/helpers';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { Sale, SaleDetail } from '../../interfaces';
import { formFieldsSale } from '../../utils/formFieldsSale';
import { Badge, Button } from '@/components';

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
    header: ({ column }) => (
      <ButtonHeaderTable column={column} label="Clientes:" />
    ),
    cell: ({ row: { original } }) => {
      const setClients = new Set(
        original.details.map((item) => item.client.first_name)
      );
      const clients = Array.from(setClients);
      const maxVisible = 2;
      const hiddenCount = clients.length - maxVisible;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {clients.slice(0, maxVisible).map((client, index) => (
            <Badge key={`${client}-${index}`} className="mb-1 mr-1">
              {client}
            </Badge>
          ))}

          {hiddenCount > 0 && (
            <ToolTipTemplate content={clients.slice(maxVisible).join(',\n')}>
              <Button className="h-4 py-3 text-xs font-semibold cursor-pointer">{`Otros... (${hiddenCount})`}</Button>
            </ToolTipTemplate>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'crops',
    header: ({ column }) => (
      <ButtonHeaderTable column={column} label="Cultivos:" />
    ),
    cell: ({ row: { original } }) => {
      const setCrops = new Set(original.details.map((item) => item.crop.name));
      const crops = Array.from(setCrops);
      const maxVisible = 2;
      const hiddenCount = crops.length - maxVisible;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {crops.slice(0, maxVisible).map((crop, index) => (
            <Badge key={`${crop}-${index}`} className="mb-1 mr-1">
              {crop}
            </Badge>
          ))}

          {hiddenCount > 0 && (
            <ToolTipTemplate
              content={crops
                .slice(maxVisible)
                // .map((item) => item)
                .join(',\n')}
            >
              <Button className="h-4 py-3 text-xs font-semibold cursor-pointer">{`Otros... (${hiddenCount})`}</Button>
            </ToolTipTemplate>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: formFieldsSale.quantity.name,
    cell: ({ row }) => {
      return FormatNumber(row.getValue('quantity')) + ' Kg';
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
  {
    accessorKey: 'details',
    cell: ({ row }) => {
      const array: SaleDetail[] = row.getValue('details') ?? [];
      const result = array.some((item) => item.is_receivable);
      return result ? (
        <Badge variant={'red'}>SI</Badge>
      ) : (
        <Badge variant={'indigo'}>NO</Badge>
      );
    },
    header: ({ column }: HeaderContext<Sale, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={'¿Hay pagos pendientes?'} />
      );
    },
  },
];

export default columnsSale;
