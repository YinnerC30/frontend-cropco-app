import { ColumnDef, Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRemoveUserMutation } from '@/services/cropco';
import { useNavigate } from 'react-router-dom';

const actionsUser = ({ row }: { row: Row<User> }) => {
  const user = row.original;
  const { id } = user;
  const navigate = useNavigate();
  const [removeUser] = useRemoveUserMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate(`./view/${id}`)}>
          Ver
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate(`./modify/${id}`)}>
          Modificar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => removeUser({ id })}>
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  cell_phone_number: string;
  password: string;
}

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
    cell: actionsUser,
  },
];
