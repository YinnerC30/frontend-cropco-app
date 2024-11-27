import { ButtonHeaderTable } from '@/modules/core/components';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components';

import { Supplier } from '../../interfaces/Supplier';
import { SuppliersModuleActionsTable } from './SuppliersModuleActionsTable';
import { formFieldsSupplier } from '../../utils/formFieldsSupplier';

export const createColumnsTableSuppliers = (
  actionsInFirstColumn: boolean
): ColumnDef<Supplier>[] => {
  const columns: ColumnDef<Supplier>[] = [
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
      accessorKey: formFieldsSupplier.first_name.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsSupplier.first_name.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsSupplier.last_name.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsSupplier.last_name.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsSupplier.email.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsSupplier.email.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsSupplier.cell_phone_number.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsSupplier.cell_phone_number.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsSupplier.address.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsSupplier.address.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsSupplier.company_name.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsSupplier.company_name.label}
          />
        );
      },
    },
  ];

  const actions = {
    id: 'actions',
    cell: SuppliersModuleActionsTable,
  };

  actionsInFirstColumn ? columns.unshift(actions) : columns.push(actions);

  return columns;
};

export default createColumnsTableSuppliers;
