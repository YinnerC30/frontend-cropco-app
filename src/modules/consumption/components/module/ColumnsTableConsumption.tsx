import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { Badge, Button } from '@/components';
import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { CropHoverCard } from '@/modules/crops/components/card/CropHoverCard';
import { SupplyHoverCard } from '@/modules/supplies/components/card/SupplyHoverCard';
import { ConsumptionSupplies } from '../../interfaces';
import { formFieldsConsumption } from '../../utils/formFieldsConsumption';

export const columnsConsumption: ColumnDef<ConsumptionSupplies>[] = [
  {
    accessorKey: formFieldsConsumption.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue('date') });
    },
    header: ({ column }: HeaderContext<ConsumptionSupplies, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsConsumption.date.label}
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
    accessorKey: 'crops',
    header: ({ column }) => {
      return <ButtonHeaderTable column={column} label={'Cultivos:'} />;
    },
    cell: ({ row: { original } }) => {
      // Usar un Map para filtrar cultivos únicos por id y conservar el objeto completo
      const cropMap = new Map();
      original.details.forEach((item) => {
        const crop = item.crop;
        if (crop && !cropMap.has(crop.id)) {
          cropMap.set(crop.id, crop);
        }
      });
      const crops = Array.from(cropMap.values());

      const maxVisible = 2;
      const hiddenCount = crops.length - maxVisible;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {crops.slice(0, maxVisible).map((crop, index) => (
            <CropHoverCard data={crop as any} key={`${crop.id}-${index}`}>
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
];

export default columnsConsumption;
