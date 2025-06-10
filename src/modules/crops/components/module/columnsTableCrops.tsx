import { ButtonHeaderTable } from '@/modules/core/components';

import { FormatDate, FormatNumber } from '@/modules/core/helpers';
import { ColumnDef, HeaderContext, Row } from '@tanstack/react-table';
import { Crop } from '../../interfaces/Crop';
import { formFieldsCrop } from '../../utils';
import { CellCropAmount } from './CellCropAmount';

export const columnsTableCrops: ColumnDef<Crop>[] = [
  {
    accessorKey: formFieldsCrop.name.name,
    header: ({ column }: HeaderContext<Crop, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsCrop.name.label} />
      );
    },
  },
  {
    accessorKey: formFieldsCrop.description.name,
    header: ({ column }: HeaderContext<Crop, unknown>) => {
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
    cell: ({ row }: { row: Row<Crop> }) => {
      return FormatNumber(row.getValue('units'));
    },
    header: ({ column }: HeaderContext<Crop, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={formFieldsCrop.units.label} />
      );
    },
  },
  {
    accessorKey: formFieldsCrop.location.name,
    header: ({ column }: HeaderContext<Crop, unknown>) => {
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
    cell: ({ row }: { row: Row<Crop> }) => {
      const date: string = row.getValue(formFieldsCrop.date_of_creation.name);

      return FormatDate({ date });
    },
    header: ({ column }: HeaderContext<Crop, unknown>) => {
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
    cell: ({ row }: { row: Row<Crop> }) => {
      const date: string = row.getValue(
        formFieldsCrop.date_of_termination.name
      );
      if (!date) {
        return <span className="text-red-500">Sin fecha</span>;
      }
      return FormatDate({ date });
    },
    header: ({ column }: HeaderContext<Crop, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsCrop.date_of_termination.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsCrop.amount.name,
    cell: ({ row }) => <CellCropAmount row={row} />,
    header: ({ column }: HeaderContext<Crop, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsCrop.amount.label}
        />
      );
    },
  },
];
