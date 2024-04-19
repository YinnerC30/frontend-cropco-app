import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchema } from "../utils";

const defaultValues = {
  name: undefined,
  description: undefined,
  units: undefined,
  location: undefined,
  dates: {
    date_of_creation: undefined,
    date_of_termination: undefined,
  },
};

export const useCropForm = () => {
  const form = useCreateForm({ schema: formSchema, defaultValues });
  return { form };
};
