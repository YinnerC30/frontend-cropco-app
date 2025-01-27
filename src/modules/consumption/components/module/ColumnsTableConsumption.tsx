import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { ConsumptionSupplies } from '../../interfaces';
import { formFieldsConsumption } from '../../utils/formFieldsConsumption';
import { Badge } from '@/components';

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

      const iterator = Array.from(setSupplies);

      return iterator.map((name, index) => (
        <Badge key={name + index} className="mb-1 mr-1">
          {name}
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
];

export default columnsConsumption;
