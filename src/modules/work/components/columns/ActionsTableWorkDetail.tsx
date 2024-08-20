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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";

import { calculateTotal, remove } from "../../utils/workSlice";
import { ModifyWorkDetail } from "../ModifyWorkDetail";

export const ActionsTableWorkDetail = (workDetail: any) => {
  console.log(workDetail);
  const dispatch = useAppDispatch();

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    console.log("Se dio clic");
    dispatch(remove(workDetail));
    toast.success(
      `Se ha eliminado el trabajo del empleado ${workDetail?.employee?.first_name}`
    );
    dispatch(calculateTotal());
    setOpenDropDownMenu(false);
  };

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
                <Button variant={"ghost"}>
                  <TrashIcon className="w-4 h-4 mr-2" /> Eliminar
                </Button>
              </AlertDialogTrigger>

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
                    <Button
                      variant="secondary"
                      onClick={() => setOpenDropDownMenu(false)}
                    >
                      Cancelar
                    </Button>
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
            <>
              <Button variant="ghost" onClick={() => setDialogOpen(true)}>
                <Pencil2Icon className="w-full h-4 mr-2" /> Modificar
              </Button>
              <ModifyWorkDetail
                defaultValues={workDetail}
                isDialogOpen={isDialogOpen}
                setDialogOpen={setDialogOpen}
                afterEffect={setOpenDropDownMenu}
              />
            </>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
