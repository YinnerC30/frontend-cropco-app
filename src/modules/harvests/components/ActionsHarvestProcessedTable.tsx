import { Button } from "@/components/ui/button";

import { PaperPlaneIcon, Pencil2Icon } from "@radix-ui/react-icons";

import { MoreHorizontal, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ModifyHarvestProcessed } from "./ModifyHarvestProcessed";

type MutateParams = {
  id: string;
};
interface Props {
  mutate: UseMutateFunction<any, unknown, MutateParams, unknown> | any;
  id: string;
  values: any;
}

export const ActionsHarvestProcessedTable = ({ mutate, id, values }: Props) => {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);

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
          <div>
            <Button variant="ghost" onClick={() => setIsOpenDialogForm(true)}>
              <Pencil2Icon className="w-full h-4 mr-2" /> Modificar
            </Button>
            {isOpenDialogForm && (
              <ModifyHarvestProcessed
                isOpenDialogForm={isOpenDialogForm}
                setIsOpenDialogForm={setIsOpenDialogForm}
                defaultValues={values}
                afterEffect={setOpenDropDownMenu}
              />
            )}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
