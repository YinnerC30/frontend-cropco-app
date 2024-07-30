import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useState } from "react";
import { formSchema } from "../utils";

export const defaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  cell_phone_number: "",
  password: {
    password1: "",
    password2: "",
  },
};

export const useUserForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = (event: any) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  const form = useCreateForm({ schema: formSchema, defaultValues });
  return {
    showPassword,
    setShowPassword,
    togglePasswordVisibility,
    form,
  };
};
