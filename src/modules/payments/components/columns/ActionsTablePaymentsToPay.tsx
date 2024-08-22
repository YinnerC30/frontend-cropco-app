import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemTemplate } from "@/modules/core/components/table/actions/ItemTemplate";
import { Trash } from "lucide-react";
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
      <ItemTemplate
        setOpenDropDownMenu={setOpenDropDownMenu}
        action={handleDelete}
        message="Eliminar"
        Icon={Trash}
      />
    </ActionsTable>
  );
};
