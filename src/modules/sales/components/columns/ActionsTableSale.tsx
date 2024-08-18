import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { ItemModifyRecord } from "@/modules/core/components/table/actions/ItemModifyRecord";
import { ItemViewRecord } from "@/modules/core/components/table/actions/ItemViewRecord";
import { useState } from "react";

export const ActionsTableSale = ({ mutate, id }: any) => {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  return (
    <ActionsTable
      openDropDownMenu={openDropDownMenu}
      setOpenDropDownMenu={setOpenDropDownMenu}
    >
      <ItemCopyIdRecord id={id} setOpenDropDownMenu={setOpenDropDownMenu} />
      <ItemDeleteRecord
        mutate={mutate}
        id={id}
        setOpenDropDownMenu={setOpenDropDownMenu}
      />
      <ItemModifyRecord id={id} />
      <ItemViewRecord id={id} />
    </ActionsTable>
  );
};