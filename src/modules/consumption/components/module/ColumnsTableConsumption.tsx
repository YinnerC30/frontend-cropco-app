import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
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
];

export default columnsConsumption;
