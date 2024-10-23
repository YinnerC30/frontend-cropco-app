import { ButtonHeaderTable } from '@/modules/core/components/table/ButtonHeaderTable';
import { ColumnDef } from '@tanstack/react-table';

import { User } from '../interfaces/User';
import { ActionsTableUsers } from './ActionsTableUsers';
import { formFieldsUser } from '../utils';

export const columnsTableUsers: ColumnDef<User>[] = [
  {
    id: 'actions',
    cell: ActionsTableUsers,
  },
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
];

export default columnsTableUsers;
