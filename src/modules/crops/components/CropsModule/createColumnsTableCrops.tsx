import { ButtonHeaderTable } from '@/modules/core/components';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components';

import { formFieldsCrop } from '../../utils';
import { Crop } from '../../interfaces/Crop';
import { CropsModuleActionsTable } from './CropsModuleActionsTable';
import { FormatDate, FormatNumber } from '@/modules/core/helpers';

export const createColumnsTableCrops = (
  actionsInFirstColumn: boolean
): ColumnDef<Crop>[] => {
  const columns: ColumnDef<Crop>[] = [
    {
      id: 'select',
      header: ({ table }: any) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="-ml-[6px] mr-2"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: formFieldsCrop.name.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsCrop.name.label}
          />
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
          <ButtonHeaderTable
            column={column}
            label={formFieldsCrop.units.label}
          />
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
  ];

  const actions = {
    id: 'actions',
    cell: CropsModuleActionsTable,
  };

  actionsInFirstColumn ? columns.unshift(actions) : columns.push(actions);

  return columns;
};

export default createColumnsTableCrops;
