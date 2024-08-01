import { Crop } from '@/modules/crops/interfaces/Crop';
import { ColumnDef } from '@tanstack/react-table';

import { FormatDate } from '@/modules/core/helpers/FormatDate';
import { FormatNumber } from '@/modules/core/helpers/FormatNumber';
import { ButtonHeaderTable } from '../../core/components';
import { formFieldsCrop } from '../utils';
import { ActionsTableCrops } from './ActionsTableCrops';

export const columnsTableCrops: ColumnDef<Crop>[] = [
  {
    accessorKey: formFieldsCrop.name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsCrop.name.label} />
      );
    },
  },
  {
    accessorKey: formFieldsCrop.description.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsCrop.description.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsCrop.units.name,
    cell: ({ row }) => {
      return FormatNumber(row.getValue('units'));
    },
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsCrop.units.label} />
      );
    },
  },
  {
    accessorKey: formFieldsCrop.location.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsCrop.location.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsCrop.date_of_creation.name,
    cell: ({ row }) => {
      const date: string = row.getValue(formFieldsCrop.date_of_creation.name);
      return FormatDate({ date });
    },
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsCrop.date_of_creation.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsCrop.date_of_termination.name,
    cell: ({ row }) => {
      const date: string = row.getValue(
        formFieldsCrop.date_of_termination.name
      );
      return FormatDate({ date });
    },
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsCrop.date_of_termination.label}
        />
      );
    },
  },
  {
    id: 'actions',
    cell: ActionsTableCrops,
  },
];

export default columnsTableCrops;
