import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { ItemModifyRecord } from "@/modules/core/components/table/actions/ItemModifyRecord";
import { ItemViewRecord } from "@/modules/core/components/table/actions/ItemViewRecord";
import { useState } from "react";

export const ActionsTableShopping = ({ id, mutate }: any) => {
  const [openPopover, setOpenPopover] = useState(false);

  const handleDelete = () => {
    mutate(id);
  };
  return (
    <ActionsTable
      open={openPopover}
      onChange={setOpenPopover}
    >
      <ItemCopyIdRecord id={id} onChange={setOpenPopover} />
      <ItemModifyRecord id={id} />
      <ItemDeleteRecord
        action={handleDelete}
        onChange={setOpenPopover}
      />
      <ItemViewRecord id={id} />
    </ActionsTable>
  );
};
