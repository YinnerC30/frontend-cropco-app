import { LayersIcon } from "@radix-ui/react-icons";

import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { ItemModifyRecord } from "@/modules/core/components/table/actions/ItemModifyRecord";
import { ItemNavigate } from "@/modules/core/components/table/actions/ItemNavigate";
import { ItemViewRecord } from "@/modules/core/components/table/actions/ItemViewRecord";
import { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";

type MutateParams = {
  id: string;
};
interface Props {
  mutate: UseMutateFunction<any, unknown, MutateParams, unknown> | any;
  id: string;
}

export const ActionsTableHarvest = ({ mutate, id }: Props) => {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  return (
    <ActionsTable
      openDropDownMenu={openDropDownMenu}
      setOpenDropDownMenu={setOpenDropDownMenu}
    >
      <ItemCopyIdRecord id={id} setOpenDropDownMenu={setOpenDropDownMenu} />
      <ItemDeleteRecord
        id={id}
        mutate={mutate}
        setOpenDropDownMenu={setOpenDropDownMenu}
      />
      <ItemModifyRecord id={id} />
      <ItemViewRecord id={id} />
      <ItemNavigate
        path={`../processed/view/${id}`}
        Icon={LayersIcon}
        name={"Inventario"}
      />
    </ActionsTable>
  );
};
