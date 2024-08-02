import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchemaSupply } from "../utils";

export const defaultValues = {
  name: "",
  brand: "",
  unit_of_measure: undefined,
  observation: "",
};

export const useSupplyForm = () => {
  const form = useCreateForm({ schema: formSchemaSupply, defaultValues });
  return {
    form,
  };
};
