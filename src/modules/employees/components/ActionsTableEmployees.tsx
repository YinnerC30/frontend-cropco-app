import { ActionsTable } from "@/modules/core/components/table/ActionsTable";

import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { ItemModifyRecord } from "@/modules/core/components/table/actions/ItemModifyRecord";
import { ItemViewRecord } from "@/modules/core/components/table/actions/ItemViewRecord";
import { useState } from "react";
import { useDeleteEmployee } from "../hooks/useDeleteEmployee";

export const ActionsTableEmployees = ({ row }: any) => {
  const { id } = row.original;
  const { mutate } = useDeleteEmployee();
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const handleDelete = () => {
    mutate(id);
  };
  return (
    <>
      <ActionsTable
        openDropDownMenu={openDropDownMenu}
        setOpenDropDownMenu={setOpenDropDownMenu}
      >
        <ItemCopyIdRecord id={id} setOpenDropDownMenu={setOpenDropDownMenu} />
        <ItemDeleteRecord
          action={handleDelete}
          setOpenDropDownMenu={setOpenDropDownMenu}
        />
        <ItemModifyRecord id={id} />
        <ItemViewRecord id={id} />
      </ActionsTable>
    </>
  );
};
