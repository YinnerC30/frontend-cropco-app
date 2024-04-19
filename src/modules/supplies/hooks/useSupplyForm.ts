import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchema } from "../utils";

export const defaultValues = {
  name: "",
  brand: "",
  unit_of_measure: undefined,
  observation: "",
};

export const useSupplyForm = () => {
  const form = useCreateForm({ schema: formSchema, defaultValues });
  return {
    form,
  };
};
