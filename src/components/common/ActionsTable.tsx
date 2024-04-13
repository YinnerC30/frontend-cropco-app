import { Button } from '@/components/ui/button';

import { EyeOpenIcon, Pencil2Icon } from '@radix-ui/react-icons';

import { MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
}

export const ActionsTable = ({ id }: Props) => {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const navigate = useNavigate();
  return (
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
          <Button variant={'ghost'} onClick={() => navigate(`../view/${id}`)}>
            <EyeOpenIcon className="w-full h-4 mr-2" /> Ver
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
