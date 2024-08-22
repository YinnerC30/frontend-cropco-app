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
import { ItemTemplate } from "@/modules/core/components/table/actions/ItemTemplate";
import { CircleDollarSignIcon } from "lucide-react";
import { useState } from "react";

export const ActionsTablePaymentsPendingWork = ({
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
      <ItemTemplate
        setOpenDropDownMenu={setOpenDropDownMenu}
        action={handlePayRecord}
        message="Pagar"
        Icon={CircleDollarSignIcon}
      />
    </ActionsTable>
  );
};
