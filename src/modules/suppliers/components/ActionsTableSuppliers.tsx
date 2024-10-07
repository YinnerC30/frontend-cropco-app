import { ActionsTable } from "@/modules/core/components/table/ActionsTable";

import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { ItemModifyRecord } from "@/modules/core/components/table/actions/ItemModifyRecord";
import { ItemViewRecord } from "@/modules/core/components/table/actions/ItemViewRecord";
import { useState } from "react";
import { useDeleteSupplier } from "../hooks/useDeleteSupplier";

export const ActionsTableSuppliers = ({ row }: any) => {
  const { id } = row.original;
  const { mutate } = useDeleteSupplier();
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const handleDelete = () => {
    mutate(id);
  };
  return (
    <>
      <ActionsTable
        open={openDropDownMenu}
        onChange={setOpenDropDownMenu}
      >
        <ItemCopyIdRecord id={id} onChange={setOpenDropDownMenu} />
        <ItemDeleteRecord
          action={handleDelete}
          onChange={setOpenDropDownMenu}
        />
        <ItemModifyRecord id={id} />
        <ItemViewRecord id={id} />
      </ActionsTable>
    </>
  );
};
