import { useAppDispatch } from "@/redux/store";
import { useState } from "react";
import { toast } from "sonner";

import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { ItemModifyRecordDetail } from "@/modules/core/components/table/actions/ItemModifyRecordDetail";
import { remove } from "../../utils/consumptionSlice";
import { ModifyConsumptionDetail } from "../ModifyConsumptionDetail";



export const ActionsTableConsumptionDetail = ({ consumptionDetail }: any) => {
  const dispatch = useAppDispatch();

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    dispatch(remove(consumptionDetail));
    toast.success(
      `Se ha eliminado el consumo del insumo ${consumptionDetail.supply.name}`
    );

    setOpenDropDownMenu(false);
  };
  return (
    <ActionsTable
      open={openDropDownMenu}
      onChange={setOpenDropDownMenu}
    >
      <ItemCopyIdRecord
        id={consumptionDetail.id}
        onChange={setOpenDropDownMenu}
      />
      <ItemDeleteRecord
        action={handleDelete}
        onChange={setOpenDropDownMenu}
      />
      <ItemModifyRecordDetail setOpenDialog={setDialogOpen}>
        <ModifyConsumptionDetail
          defaultValues={consumptionDetail}
          isDialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          afterEffect={setOpenDropDownMenu}
        />
      </ItemModifyRecordDetail>
    </ActionsTable>
  );
};
