import { useAppDispatch } from "@/redux/store";
import { useState } from "react";
import { toast } from "sonner";

import { calculateTotal, remove } from "../../utils/harvestSlice";

import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { ItemModifyRecordDetail } from "@/modules/core/components/table/actions/ItemModifyRecordDetail";
import { ModifyHarvestDetail } from "../ModifyHarvestDetail";

export const ActionsTableHarvestDetail = ({ harvestDetail }: any) => {
  const dispatch = useAppDispatch();

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    dispatch(remove(harvestDetail));
    toast.success(
      `Se ha eliminado la cosecha del empleado ${harvestDetail.employee.first_name}`
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
        id={harvestDetail.id}
        onChange={setOpenDropDownMenu}
      />
      <ItemDeleteRecord
        action={handleDelete}
        onChange={setOpenDropDownMenu}
      />
      <ItemModifyRecordDetail setOpenDialog={setDialogOpen}>
        <ModifyHarvestDetail
          defaultValues={harvestDetail}
          isDialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          afterEffect={setOpenDropDownMenu}
        />
      </ItemModifyRecordDetail>
    </ActionsTable>
  );
};
