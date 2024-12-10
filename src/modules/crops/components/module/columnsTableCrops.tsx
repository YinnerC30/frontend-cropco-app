import { ButtonHeaderTable } from '@/modules/core/components';

import { FormatDate, FormatNumber } from '@/modules/core/helpers';
import { formFieldsCrop } from '../../utils';

export const columnsTableCrops = [
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
    cell: ({ row }: any) => {
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
    cell: ({ row }: any) => {
      const date: string = row.getValue(formFieldsCrop.date_of_creation.name);
      console.log(date);
      console.log(typeof date);
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
    cell: ({ row }: any) => {
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
];
