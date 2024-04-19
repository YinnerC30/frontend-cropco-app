import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useState } from "react";
import { formSchemaHarvest } from "../utils";
import { defaultValuesHarvest } from "../utils/ElementsHarvestForm";

export const useHarvestForm = () => {
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const [isOpenDialogModifyForm, setIsOpenDialogModifyForm] = useState(false);
  const [harvestDetail, setHarvestDetail] = useState({});

  const formHarvest = useCreateForm({
    schema: formSchemaHarvest,
    defaultValues: defaultValuesHarvest,
  });
  return {
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    harvestDetail,
    setHarvestDetail,
    formHarvest,
  };
};
