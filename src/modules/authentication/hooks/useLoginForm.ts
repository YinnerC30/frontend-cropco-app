import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useState } from "react";
import { useLoginUser } from "./useLoginUser";
import { formSchema } from "../utils/formSchema";
import { UserActive } from "../interfaces/UserActive";
import { useDispatch } from "react-redux";
import { setUserActive } from "../utils/authenticationSlice";

export const useLoginForm = () => {
  const form = useCreateForm({
    schema: formSchema,
    defaultValues: {
      email: "pedrosilva@example.com",
      password: "123zxc",
    },
  });

  const { data, isPending, isSuccess } = useLoginUser();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (event: any) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const saveUserInLocalStorage = (values: UserActive) => {
    localStorage.setItem("user-active", JSON.stringify(values));
    dispatch(setUserActive(values));
  };
  return {
    form,
    data,
    isPending,
    isSuccess,
    showPassword,
    togglePasswordVisibility,
    saveUserInLocalStorage,
  };
};
