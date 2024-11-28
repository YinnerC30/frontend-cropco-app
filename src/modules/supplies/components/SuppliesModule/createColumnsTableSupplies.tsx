import { ButtonHeaderTable } from '@/modules/core/components';
import { ColumnDef } from '@tanstack/react-table';

import { Badge, Checkbox } from '@/components';

import { formFieldsSupply } from '../../utils';
import { Supply } from '../../interfaces/Supply';
import { SuppliesModuleActionsTable } from './SuppliesModuleActionsTable';

export const createColumnsTableSupplies = (
  actionsInFirstColumn: boolean
): ColumnDef<Supply>[] => {
  const columns: ColumnDef<Supply>[] = [
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
      accessorKey: formFieldsSupply.name.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsSupply.name.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsSupply.brand.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsSupply.brand.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsSupply.unit_of_measure.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsSupply.unit_of_measure.label}
          />
        );
      },
      cell: ({ row }) => {
        const unitOfMeasure: string = row.getValue('unit_of_measure');
        return (
          <Badge variant={unitOfMeasure === 'GRAMOS' ? 'lime' : 'cyan'}>
            {unitOfMeasure}
          </Badge>
        );
      },
    },
    {
      accessorKey: formFieldsSupply.observation.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsSupply.observation.label}
          />
        );
      },
    },
  ];

  const actions = {
    id: 'actions',
    cell: SuppliesModuleActionsTable,
  };

  actionsInFirstColumn ? columns.unshift(actions) : columns.push(actions);

  return columns;
};

export default createColumnsTableSupplies;
