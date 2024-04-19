import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { formSchema } from "../utils/formSchema";

const defaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  cell_phone_number: "",
  address: "",
  company_name: undefined,
};

export const useSupplierForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  return {
    form,
  };
};
