import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchemaSupplier } from "../utils/formSchemaSupplier";

const defaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  cell_phone_number: "",
  address: "",
  company_name: undefined,
};

export const useSupplierForm = () => {
  const form = useCreateForm({ schema: formSchemaSupplier, defaultValues });
  return {
    form,
  };
};
