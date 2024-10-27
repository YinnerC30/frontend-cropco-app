import { ButtonHeaderTable } from '@/modules/core/components/table/ButtonHeaderTable';
import { ColumnDef } from '@tanstack/react-table';

import { User } from '../interfaces/User';
import { formFieldsUser } from '../utils';
import { ActionsTableUsers } from './ActionsTableUsers';



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
