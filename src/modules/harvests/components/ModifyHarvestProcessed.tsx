import { z } from "zod";

import { usePatchHarvestProcessed } from "../hooks/usePatchHarvestProcessed";

import { ConvertStringToDate } from "@/modules/core/helpers/ConvertStringToDate";
import { useEffect } from "react";
import { CreateFormSchemaHarvestProcessed } from "../utils/formSchemaHarvestProcessed";
import { FormHarvestProcessed } from "./forms/FormHarvestProcessed";

export const ModifyHarvestProcessed = ({
  isOpenDialogForm,
  setIsOpenDialogForm,
  defaultValues,
  afterEffect,
  harvest,
}: any) => {
  const formSchemaHarvestProcessed = CreateFormSchemaHarvestProcessed(
    defaultValues.harvest.date
  );

  const { mutate, isSuccess, isPending } = usePatchHarvestProcessed();

  const onSubmitHarvestProcessed = async (
    values: z.infer<typeof formSchemaHarvestProcessed>
  ) => {
    const { crop, harvest, id } = defaultValues;

    mutate({
      ...values,
      crop: { id: crop.id },
      harvest: { id: harvest.id },
      id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpenDialogForm(false);
      afterEffect && afterEffect(false);
    }
  }, [isSuccess]);

  return (
    <FormHarvestProcessed
      onSubmit={onSubmitHarvestProcessed}
      defaultValues={{
        ...defaultValues,
        date: ConvertStringToDate(defaultValues.date),
      }}
      dateHarvest={harvest.date}
      isOpenDialogForm={isOpenDialogForm}
      setIsOpenDialogForm={setIsOpenDialogForm}
      isPending={isPending}
      dialogTitle={"Modificar cosecha procesada"}
      dialogDescription={
        "Cuando termine de modificar la información, puede cerrar esta ventana."
      }
    />
  );
};
