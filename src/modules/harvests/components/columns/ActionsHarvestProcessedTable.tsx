import { Button } from "@/components/ui/button";

import { Pencil2Icon } from "@radix-ui/react-icons";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ActionsTable } from "@/modules/core/components";
import { ItemCopyIdRecord } from "@/modules/core/components/table/actions/ItemCopyIdRecord";
import { ItemDeleteRecord } from "@/modules/core/components/table/actions/ItemDeleteRecord";
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

export const ActionsHarvestProcessedTable = ({ mutate, id, values }: Props) => {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);

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
      <DropdownMenuItem asChild>
        <>
          <Button variant="ghost" onClick={() => setIsOpenDialogForm(true)}>
            <Pencil2Icon className="w-full h-4 mr-2" /> Modificar
          </Button>
          {isOpenDialogForm && (
            <ModifyHarvestProcessed
              isOpenDialogForm={isOpenDialogForm}
              setIsOpenDialogForm={setIsOpenDialogForm}
              defaultValues={values}
              afterEffect={setOpenDropDownMenu}
            />
          )}
        </>
      </DropdownMenuItem>
    </ActionsTable>
  );
};
