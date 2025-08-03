import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge, Button } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { Sale, SaleDetail } from '../../interfaces';
import { formFieldsSale } from '../../utils/formFieldsSale';
import { CellSaleAmount } from './CellSaleAmount';
import { CropHoverCard } from '@/modules/crops/components/card/CropHoverCard';
import { Crop } from '@/modules/crops/interfaces/Crop';
import { PersonHoverCard } from '@/modules/core/components/card/PersonHoverCard';
import { MODULE_CLIENTS_PATHS } from '@/modules/clients/routes/pathRoutes';

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
    accessorKey: 'details',
    header: ({ column }) => (
      <ButtonHeaderTable column={column} label="Clientes:" />
    ),
    cell: ({ row: { original } }) => {
      // Usar un Map para filtrar clientes únicos por id y conservar el objeto completo
      const clientMap = new Map();
      original.details.forEach((item) => {
        const client = {
          ...item.client,
          full_name: item.client.first_name + ' ' + item.client.last_name,
        };
        if (!clientMap.has(client.id)) {
          clientMap.set(client.id, client);
        }
      });
      const clients = Array.from(clientMap.values());
      const maxVisible = 2;
      const hiddenCount = clients.length - maxVisible;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {clients.slice(0, maxVisible).map((client, index) => (
            <PersonHoverCard
              key={`${client.id}-${index}`}
              data={client as any}
              routeToNavigate={MODULE_CLIENTS_PATHS.ViewOne + client.id}
            >
              <Badge className="mb-1 mr-1" variant={'orange'}>
                {client.full_name}
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
    accessorKey: 'crops',
    header: ({ column }) => (
      <ButtonHeaderTable column={column} label="Cultivos:" />
    ),
    cell: ({ row: { original } }) => {
      // Usar un Map para filtrar crops únicos por id pero conservar el objeto completo
      const cropMap = new Map();
      original.details.forEach((item) => {
        if (!cropMap.has(item.crop.id)) {
          cropMap.set(item.crop.id, item.crop);
        }
      });
      const crops = Array.from(cropMap.values());
      const maxVisible = 2;
      const hiddenCount = crops.length - maxVisible;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {crops.slice(0, maxVisible).map((crop, index) => (
            <CropHoverCard data={crop as Crop} key={`${crop.id}-${index}`}>
              <Badge className="mb-1 mr-1" variant={'purple'}>
                {crop.name}
              </Badge>
            </CropHoverCard>
          ))}

          {hiddenCount > 0 && (
            <Button className="h-4 py-3 text-xs font-semibold cursor-pointer">{`Otros... (${hiddenCount})`}</Button>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: formFieldsSale.amount.name,
    cell: ({ row }) => {
      return <CellSaleAmount row={row} />;
    },
    header: ({ column }: HeaderContext<Sale, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSale.amount.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSale.value_pay.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<Sale, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSale.value_pay.label}
        />
      );
    },
  },
  {
    accessorKey: 'details',
    cell: ({ row }) => {
      const array: SaleDetail[] = row.getValue('details') ?? [];
      const result = array.some((item) => item.is_receivable);
      return result ? (
        <Badge variant={'destructive'}>SI</Badge>
      ) : (
        <Badge variant={'success'}>NO</Badge>
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
