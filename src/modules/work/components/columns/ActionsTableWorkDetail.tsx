import { Button } from "@/components/ui/button";

import { Pencil2Icon } from "@radix-ui/react-icons";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState } from "react";

import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";

import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { calculateTotal, remove } from "../../utils/workSlice";
import { ModifyWorkDetail } from "../ModifyWorkDetail";
import { ItemModifyRecordDetail } from "@/modules/core/components/table/actions/ItemModifyRecordDetail";

export const ActionsTableWorkDetail = ({ workDetail }: any) => {
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
    <ActionsTable
      openDropDownMenu={openDropDownMenu}
      setOpenDropDownMenu={setOpenDropDownMenu}
    >
      <ItemCopyIdRecord
        id={workDetail.id}
        setOpenDropDownMenu={setOpenDropDownMenu}
      />
      <ItemDeleteRecord
        action={handleDelete}
        setOpenDropDownMenu={setOpenDropDownMenu}
      />
      <ItemModifyRecordDetail setOpenDialog={setDialogOpen}>
        <ModifyWorkDetail
          defaultValues={workDetail}
          isDialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          afterEffect={setOpenDropDownMenu}
        />
      </ItemModifyRecordDetail>
    </ActionsTable>
  );
};
