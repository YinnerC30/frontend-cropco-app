import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchemaClient } from "../utils";

export const defaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  cell_phone_number: "",
  address: "",
};

export const useClientForm = () => {
  const form = useCreateForm({ schema: formSchemaClient, defaultValues });
  return {
    form,
  };
};
