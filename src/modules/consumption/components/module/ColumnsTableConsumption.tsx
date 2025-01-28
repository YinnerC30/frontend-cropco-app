import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable, ToolTipTemplate } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { ConsumptionSupplies } from '../../interfaces';
import { formFieldsConsumption } from '../../utils/formFieldsConsumption';
import { Badge, Button } from '@/components';

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
    accessorKey: 'crops',
    header: ({ column }) => {
      return <ButtonHeaderTable column={column} label={'Cultivos:'} />;
    },
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
            <ToolTipTemplate content={crops.slice(maxVisible).join(',\n')}>
              <Button className="h-4 py-3 text-xs font-semibold cursor-pointer">{`Otros... (${hiddenCount})`}</Button>
            </ToolTipTemplate>
          )}
        </div>
      );
    },
  },
];

export default columnsConsumption;
