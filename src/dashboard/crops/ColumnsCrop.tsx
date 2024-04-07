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

import { EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';

import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

import { User } from '../../interfaces/User';
import { ColumnDef } from '@tanstack/react-table';
import { formFields } from './ElementsCropForm';
import { useDeleteCrop } from './hooks/useDeleteCrop';

export let columns: ColumnDef<User>[] = [];

for (const field of formFields) {
  if (field.visible) {
    columns.push({
      accessorKey: field.name,
      header: ({ column }: any) => {
        return (
          <Button
            className="px-0 hover:bg-transparent"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {field.label}
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        );
      },
    });
  }
}

columns.unshift({
  id: 'actions',
  cell: ({ row }: any) => {
    const crop = row.original;
    const { id } = crop;
    const { mutate } = useDeleteCrop();

    const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

    const handleDelete = () => {
      mutate(id!);
      setOpenDropDownMenu(false);
    };

    const navigate = useNavigate();

    return (
      <>
        <DropdownMenu open={openDropDownMenu} modal={openDropDownMenu}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-8 h-8 p-0"
              onClick={() => setOpenDropDownMenu(!openDropDownMenu)}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onPointerDownOutside={() => setOpenDropDownMenu(false)}
            align="center"
            className="flex flex-col items-center"
          >
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator className="w-full" />
            <DropdownMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={'ghost'}>
                    <TrashIcon className="w-4 h-4 mr-2" /> Eliminar
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Estas seguro de eliminar el registro?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción es irreversible y no podrá recuperar su
                      registro
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
            </DropdownMenuItem>
            <DropdownMenuSeparator className="w-full" />
            <DropdownMenuItem asChild>
              <Button
                variant={'ghost'}
                className="mr-2"
                onClick={() => navigate(`../modify/${id}`)}
              >
                <Pencil2Icon className="w-full h-4 mr-2" /> Modificar
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="w-full" />
            <DropdownMenuItem asChild>
              <Button
                variant={'ghost'}
                onClick={() => navigate(`../view/${id}`)}
              >
                <EyeOpenIcon className="w-full h-4 mr-2" /> Ver
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  },
});

export default columns;
