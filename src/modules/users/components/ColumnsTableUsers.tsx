import { ButtonHeaderTable } from '@/modules/core/components/table/ButtonHeaderTable';
import { ColumnDef } from '@tanstack/react-table';

import { User } from '../interfaces/User';
import { formFieldsUser } from '../utils';
import { ActionsTableUsers } from './ActionsTableUsers';
import { Checkbox } from '@/components';



export const createColumnsTableUsers = (actionsInFirstColumn: boolean): ColumnDef<User>[] => {

  const columns: any = [

    {
      accessorKey: formFieldsUser.first_name.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsUser.first_name.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsUser.last_name.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsUser.last_name.label}
          />
        );
      },
    },
    {
      accessorKey: formFieldsUser.email.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable column={column} label={formFieldsUser.email.label} />
        );
      },
    },
    {
      accessorKey: formFieldsUser.cell_phone_number.name,
      header: ({ column }: any) => {
        return (
          <ButtonHeaderTable
            column={column}
            label={formFieldsUser.cell_phone_number.label}
          />
        );
      },
    },
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"

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
  ]

  const actions = {
    id: 'actions',
    cell: ActionsTableUsers,
  }

  if (actionsInFirstColumn) {
    columns.unshift(actions)
  } else {
    columns.push(actions,)
  }

  return columns;
}

export default createColumnsTableUsers;
