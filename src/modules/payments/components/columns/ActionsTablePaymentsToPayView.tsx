import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemNavigate } from "@/modules/core/components/table/actions/ItemNavigate";
import { Link } from "lucide-react";
import { useState } from "react";

export const ActionsTablePaymentsToPayView = ({ record }: any) => {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  

  return (
    <ActionsTable
      onChange={setOpenDropDownMenu}
      open={openDropDownMenu}
    >
      <ItemCopyIdRecord
        id={record.id}
        onChange={setOpenDropDownMenu}
      ></ItemCopyIdRecord>
      <ItemNavigate
        path={`/${record.type === "harvest" ? "harvests" : "works"}/view/${
          record.type === "harvest" ? record?.harvest?.id : record?.work?.id
        }`}
        Icon={Link}
        name={"Ver registro"}
      />
    </ActionsTable>
  );
};
