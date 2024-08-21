import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { ItemViewRecord } from "@/modules/core/components/table/actions/ItemViewRecord";
import { useState } from "react";

export const ActionsTablePayment = ({ id, mutate }: any) => {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const handleDelete = () => {
    mutate(id);
  };
  return (
    <ActionsTable
      openDropDownMenu={openDropDownMenu}
      setOpenDropDownMenu={setOpenDropDownMenu}
    >
      <ItemCopyIdRecord
        id={id}
        setOpenDropDownMenu={setOpenDropDownMenu}
      ></ItemCopyIdRecord>
      <ItemDeleteRecord
        action={handleDelete}
        setOpenDropDownMenu={setOpenDropDownMenu}
      ></ItemDeleteRecord>
      <ItemViewRecord id={id}></ItemViewRecord>
    </ActionsTable>
  );
};
