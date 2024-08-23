import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { ItemModifyRecord } from "@/modules/core/components/table/actions/ItemModifyRecord";
import { useState } from "react";

export const ActionsTableShopping = ({ id, mutate }: any) => {
  const [openPopover, setOpenPopover] = useState(false);

  const handleDelete = () => {
    mutate(id);
  };
  return (
    <ActionsTable
      openDropDownMenu={openPopover}
      setOpenDropDownMenu={setOpenPopover}
    >
      <ItemCopyIdRecord id={id} setOpenDropDownMenu={setOpenPopover} />
      <ItemModifyRecord id={id} />
      <ItemDeleteRecord
        action={handleDelete}
        setOpenDropDownMenu={setOpenPopover}
      />
    </ActionsTable>
  );
};
