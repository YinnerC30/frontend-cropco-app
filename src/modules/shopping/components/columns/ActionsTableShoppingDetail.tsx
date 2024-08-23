import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { ItemModifyRecordDetail } from "@/modules/core/components/table/actions/ItemModifyRecordDetail";
import { useAppDispatch } from "@/redux/store";
import { useState } from "react";
import { toast } from "sonner";
import { calculateTotal, remove } from "../../utils/shoppingSlice";
import { ModifyShoppingDetail } from "../ModifyShoppingDetail";

export const ActionsTableShoppingDetail = ({ shoppingDetail }: any) => {
  const dispatch = useAppDispatch();

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    dispatch(remove(shoppingDetail));
    dispatch(calculateTotal());
    setOpenDropDownMenu(false);
    toast.success(
      `Se ha eliminado la compra del proveedor ${shoppingDetail.supplier.first_name}`
    );
  };

  return (
    <ActionsTable
      openDropDownMenu={openDropDownMenu}
      setOpenDropDownMenu={setOpenDropDownMenu}
    >
      <ItemCopyIdRecord
        id={shoppingDetail.id}
        setOpenDropDownMenu={setOpenDropDownMenu}
      />
      <ItemModifyRecordDetail setOpenDialog={setDialogOpen}>
        <ModifyShoppingDetail
          defaultValues={shoppingDetail}
          isDialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          afterEffect={setOpenDropDownMenu}
        />
      </ItemModifyRecordDetail>
      <ItemDeleteRecord
        action={handleDelete}
        setOpenDropDownMenu={setOpenDropDownMenu}
      />
    </ActionsTable>
  );
};
