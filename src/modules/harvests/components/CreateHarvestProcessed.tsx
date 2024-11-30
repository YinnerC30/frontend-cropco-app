import { z } from "zod";

import { usePostHarvestProcessed } from "../hooks/mutations/usePostHarvestProcessed";
import { CreateFormSchemaHarvestProcessed } from "../utils/formSchemaHarvestProcessed";
import { FormHarvestProcessed } from "./forms/FormHarvestProcessed";

export const CreateHarvestProcessed = ({
  isOpenDialogForm,
  setIsOpenDialogForm,
  crop,
  harvest,
}: any) => {
  const formSchemaHarvestProcessed = CreateFormSchemaHarvestProcessed(
    harvest.date
  );

  const { mutate, isSuccess, isPending } = usePostHarvestProcessed();

  const onSubmitHarvestProcessed = async (
    values: z.infer<typeof formSchemaHarvestProcessed>
  ) => {
    mutate({ ...values, crop, harvest: { id: harvest.id } });
  };

  if (isSuccess) {
    setIsOpenDialogForm(false);
  }

  return (
    <div>
      <FormHarvestProcessed
        onSubmit={onSubmitHarvestProcessed}
        dateHarvest={harvest.date}
        isOpenDialogForm={isOpenDialogForm}
        setIsOpenDialogForm={setIsOpenDialogForm}
        isSubmitting={isPending}
        dialogTitle={"Agregar cosecha procesada"}
        dialogDescription={
          "Cuando termine de agregar la información, puedes cerrar esta ventana."
        }
      />
    </div>
  );
};
