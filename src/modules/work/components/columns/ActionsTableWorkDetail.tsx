import { useState } from "react";

import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";

import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { ItemModifyRecordDetail } from "@/modules/core/components/table/actions/ItemModifyRecordDetail";
import { calculateTotal, remove } from "../../utils/workSlice";
import { ModifyWorkDetail } from "../ModifyWorkDetail";

export const ActionsTableWorkDetail = ({ workDetail }: any) => {
  const dispatch = useAppDispatch();

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    dispatch(remove(workDetail));
    toast.success(
      `Se ha eliminado el trabajo del empleado ${workDetail?.employee?.first_name}`
    );
    dispatch(calculateTotal());
    setOpenDropDownMenu(false);
  };

  return (
    <ActionsTable
      open={openDropDownMenu}
      onChange={setOpenDropDownMenu}
    >
      <ItemCopyIdRecord
        id={workDetail.id}
        onChange={setOpenDropDownMenu}
      />
      <ItemDeleteRecord
        action={handleDelete}
        onChange={setOpenDropDownMenu}
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
