

import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
import { ItemModifyRecordDetail } from "@/modules/core/components/table/actions/ItemModifyRecordDetail";
import { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { ModifyHarvestProcessed } from "../ModifyHarvestProcessed";

type MutateParams = {
  id: string;
};
interface Props {
  mutate: UseMutateFunction<any, unknown, MutateParams, unknown> | any;
  id: string;
  values: any;
}

export const ActionsTableHarvestProcessed = ({ mutate, id, values }: Props) => {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const handleDelete = () => {
    mutate(id);
  };
  return (
    <ActionsTable
      open={openDropDownMenu}
      onChange={setOpenDropDownMenu}
    >
      <ItemCopyIdRecord id={id} onChange={setOpenDropDownMenu} />
      <ItemDeleteRecord
        action={handleDelete}
        onChange={setOpenDropDownMenu}
      />
      <ItemModifyRecordDetail>
        {isOpenDialogForm && (
          <ModifyHarvestProcessed
            isOpenDialogForm={isOpenDialogForm}
            setIsOpenDialogForm={setIsOpenDialogForm}
            defaultValues={values}
            afterEffect={setOpenDropDownMenu}
          />
        )}
      </ItemModifyRecordDetail>
    </ActionsTable>
  );
};
