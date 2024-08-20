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

import { calculateTotal, remove } from "../../utils/saleSlice";
import { ModifySaleDetail } from "../ModifySaleDetail";
import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { ItemModifyRecordDetail } from "@/modules/core/components/table/actions/ItemModifyRecordDetail";

export const ActionsTableSaleDetail = ({ saleDetail }: any) => {
  const dispatch = useAppDispatch();

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    dispatch(remove(saleDetail));
    toast.success(
      `Se ha eliminado la venta del cliente ${saleDetail.client.first_name}`
    );
    dispatch(calculateTotal());
    setOpenDropDownMenu(false);
  };

  return (
    <ActionsTable
      openDropDownMenu={openDropDownMenu}
      setOpenDropDownMenu={setOpenDropDownMenu}
    >
      <ItemCopyIdRecord
        id={saleDetail.id}
        setOpenDropDownMenu={setOpenDropDownMenu}
      />
      <ItemDeleteRecord
        action={handleDelete}
        setOpenDropDownMenu={setOpenDropDownMenu}
      />
      <ItemModifyRecordDetail setOpenDialog={setDialogOpen}>
        <ModifySaleDetail
          defaultValues={saleDetail}
          isDialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          afterEffect={setOpenDropDownMenu}
        />
      </ItemModifyRecordDetail>
    </ActionsTable>
  );
};
