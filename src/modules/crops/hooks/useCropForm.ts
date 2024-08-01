import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchemaCrop } from "../utils";

const defaultValues = {
  name: undefined,
  description: undefined,
  units: 0,
  location: undefined,
  dates: {
    date_of_creation: undefined,
    date_of_termination: undefined,
  },
};

export const useCropForm = () => {
  const form = useCreateForm({ schema: formSchemaCrop, defaultValues });
  return { form };
};
