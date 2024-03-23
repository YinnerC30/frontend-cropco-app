import { ColumnDef } from '@tanstack/react-table';

import { useUserActions } from '../hooks/useUserActions';
import { GetUser } from '../interfaces/User';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link, useNavigate } from 'react-router-dom';

export const columns: ColumnDef<GetUser>[] = [
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
    cell: ({ row }) => {
      const user = row.original;
      const { id } = user;
      const { deleteUserMutation } = useUserActions();

      const handleDelete = () => {
        deleteUserMutation.mutate(id);
      };

      const navigate = useNavigate();

      return (
        <>
          {/* TODO: Cambios por iconos interactivos */}
          {/* Eliminar */}
          <AlertDialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button variant={'destructive'} className="mr-2">
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Eliminar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estas seguro de eliminar el registro?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción es irreversible y no podrá recuperar su registro
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="secondary">Cancelar</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button onClick={() => handleDelete()}>Continuar</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* Modificar */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => navigate(`../modify/${id}`)}>
                  <Pencil2Icon className="w-full h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Modificar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      );
    },
  },
];
