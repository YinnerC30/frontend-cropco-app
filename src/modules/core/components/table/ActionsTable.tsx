import { Button } from "@/components/ui/button";

import {
  EyeOpenIcon,
  PaperPlaneIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";

import { MoreHorizontal, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  mutate: any;
  id: string;
}

export const ActionsTable = ({ mutate, id }: Props) => {
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

        <DropdownMenuItem asChild>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(id);
              setOpenDropDownMenu(false);
              toast.success("Id copiado al portapapeles");
            }}
            variant={"ghost"}
          >
            <PaperPlaneIcon className="w-4 h-4 mr-2" /> Copiar Id
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="w-full" />
        <DropdownMenuItem asChild>
          <Button
            onClick={() => {
              mutate(id);
              setOpenDropDownMenu(false);
            }}
            variant={"ghost"}
          >
            <TrashIcon className="w-4 h-4 mr-2" /> Eliminar
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="w-full" />
        <DropdownMenuItem asChild>
          <Button
            variant={"ghost"}
            className="mr-2"
            onClick={() => navigate(`../modify/${id}`)}
          >
            <Pencil2Icon className="w-full h-4 mr-2" /> Modificar
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="w-full" />
        <DropdownMenuItem asChild>
          <Button variant={"ghost"} onClick={() => navigate(`../view/${id}`)}>
            <EyeOpenIcon className="w-full h-4 mr-2" /> Ver
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
