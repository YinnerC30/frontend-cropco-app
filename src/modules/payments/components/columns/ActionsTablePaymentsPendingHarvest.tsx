import { Button } from "@/components";
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { CircleDollarSignIcon } from "lucide-react";
import { useState } from "react";

export const ActionsTablePaymentsPendingHarvest = ({
  id,
  handlePayRecord,
}: any) => {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  return (
    <ActionsTable
      openDropDownMenu={openDropDownMenu}
      setOpenDropDownMenu={setOpenDropDownMenu}
    >
      <ItemCopyIdRecord id={id} setOpenDropDownMenu={setOpenDropDownMenu} />
      <DropdownMenuItem asChild>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"ghost"}>
              <CircleDollarSignIcon className="w-4 h-4 mr-2" /> Pagar
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ¿Estas seguro de agregar el registro?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción es reversible y podrá recuperar su registro
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
                <Button
                  onClick={() => {
                    handlePayRecord();
                    setOpenDropDownMenu(false);
                  }}
                >
                  Continuar
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuItem>
    </ActionsTable>
  );
};
