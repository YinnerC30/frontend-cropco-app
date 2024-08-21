import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { useState } from "react";

export const ActionsTablePaymentsToPay = ({ record, action }: any) => {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const handleDelete = () => {
    action(record.id);
  };
  return (
    <ActionsTable
      setOpenDropDownMenu={setOpenDropDownMenu}
      openDropDownMenu={openDropDownMenu}
    >
      <ItemCopyIdRecord
        id={record.id}
        setOpenDropDownMenu={setOpenDropDownMenu}
      ></ItemCopyIdRecord>
      <ItemDeleteRecord
        action={handleDelete}
        setOpenDropDownMenu={setOpenDropDownMenu}
      />
    </ActionsTable>
  );
};
