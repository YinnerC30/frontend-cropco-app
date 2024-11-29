import { ButtonHeaderTable } from '@/modules/core/components';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components';

import { formFieldsClient } from '../../utils';
import { Client } from '../../interfaces/Client';
import { ClientsModuleActionsTable } from './ClientsModuleActionsTable';

export const createColumnsTableClients = (
  actionsInFirstColumn: boolean
): ColumnDef<Client>[] => {
  const columns: ColumnDef<Client>[] = [
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
      accessorKey: formFieldsClient.first_name.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsClient.first_name.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsClient.last_name.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsClient.last_name.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsClient.email.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsClient.email.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsClient.cell_phone_number.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsClient.cell_phone_number.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsClient.address.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsClient.address.label}
          />
        );
      },
    },
  ];

  const actions = {
    id: 'actions',
    cell: ClientsModuleActionsTable,
  };

  actionsInFirstColumn ? columns.unshift(actions) : columns.push(actions);

  return columns;
};

export default createColumnsTableClients;
