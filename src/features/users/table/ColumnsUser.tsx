import { ColumnDef } from '@tanstack/react-table';

import { User } from '../interfaces/User';

import { ActionsUser } from './ActionsUser';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'first_name',
    header: 'Nombre',
  },
  {
    accessorKey: 'last_name',
    header: 'Apellido',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'cell_phone_number',
    header: 'Número celular',
  },
  {
    id: 'actions',
    cell: ActionsUser,
  },
];
