import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  openDropDownMenu: boolean;
  setOpenDropDownMenu: any;
  children: any;
}

export const ActionsTable = ({
  openDropDownMenu,
  setOpenDropDownMenu,
  children,
}: Props) => {
  return (
    <DropdownMenu open={openDropDownMenu} modal={openDropDownMenu}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-8 h-8 p-0"
          onClick={() => setOpenDropDownMenu(!openDropDownMenu)}
        >
          <span className="sr-only">Abrir menu</span>
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

        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
