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
      const setSupplies = new Set(original.details.map((item) => item.supply));

      const supplies = Array.from(setSupplies);

      const maxVisible = 2;
      const hiddenCount = supplies.length - maxVisible;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {supplies.slice(0, maxVisible).map((supply, index) => (
            <SupplyHoverCard data={supply as any}>
              <Badge
                key={`${supply}-${index}`}
                className="mb-1 mr-1"
                variant={'cyan'}
              >
                {supply.name}
              </Badge>
            </SupplyHoverCard>
          ))}

          {hiddenCount > 0 && (
            // <ToolTipTemplate content={supplies.slice(maxVisible).join(',\n')}>
            <Button className="h-4 py-3 text-xs font-semibold cursor-pointer">{`Otros... (${hiddenCount})`}</Button>
            // </ToolTipTemplate>
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
      const setCrops = new Set(original.details.map((item) => item.crop));

      const crops = Array.from(setCrops);

      const maxVisible = 2;
      const hiddenCount = crops.length - maxVisible;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {crops.slice(0, maxVisible).map((crop, index) => (
            <CropHoverCard data={crop as any}>
              <Badge
                key={`${crop}-${index}`}
                className="mb-1 mr-1"
                variant={'purple'}
              >
                {crop.name}
              </Badge>
            </CropHoverCard>
          ))}

          {hiddenCount > 0 && (
            // <ToolTipTemplate content={crops.slice(maxVisible).join(',\n')}>
            <Button className="h-4 py-3 text-xs font-semibold cursor-pointer">{`Otros... (${hiddenCount})`}</Button>
            // </ToolTipTemplate>
          )}
        </div>
      );
    },
  },
];

export default columnsConsumption;
