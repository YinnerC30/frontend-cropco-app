
import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemTemplate } from "@/modules/core/components/table/actions/ItemTemplate";
import { CircleDollarSignIcon } from "lucide-react";
import { useState } from "react";

export const ActionsTablePaymentsPendingWork = ({
  id,
  handlePayRecord,
}: any) => {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  return (
    <ActionsTable
      open={openDropDownMenu}
      onChange={setOpenDropDownMenu}
    >
      <ItemCopyIdRecord id={id} onChange={setOpenDropDownMenu} />
      <ItemTemplate
        setOpenDropDownMenu={setOpenDropDownMenu}
        action={handlePayRecord}
        message="Pagar"
        Icon={CircleDollarSignIcon}
      />
    </ActionsTable>
  );
};
