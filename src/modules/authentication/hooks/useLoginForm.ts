import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { extractValueFromParentheses, formSchemaLogin } from "../utils";
import { useAuthenticationUser } from "./useAuthenticationUser";
import { useLoginUser } from "./useLoginUser";

export const useLoginForm = () => {
  // Modificación de meta etiquetas
  useEffect(() => {
    document.title = "Login - Cropco";
  }, []);

  // Creación formulario de validación
  const formLogin = useCreateForm({
    schema: formSchemaLogin,
    defaultValues: {
      email: "carmenortega@example.com",
      password: "qwe789",
    },
  });

  // Obtener estado de autenticación del usuario actual
  const { saveUser, redirectToHome, isActiveSesion } = useAuthenticationUser();

  useEffect(() => {
    isActiveSesion() && redirectToHome();
  }, [isActiveSesion]);

  // Información del hook de LoginUser
  const { mutate, isSuccess, data, isError, error, isPending } = useLoginUser();

  // Acción a ejecutar en caso de que el Login sea exitoso
  useEffect(() => {
    if (isSuccess) {
      saveUser({
        ...data?.data,
      });
      redirectToHome();
      toast.success(`El usuario ha iniciado sesión`);
    }
  }, [isSuccess]);

  // Como manejar el error
  const handleLoginError = (axiosError: any) => {
    const { code } = axiosError;
    if (code == "ERR_NETWORK") {
      console.error(code);
      toast.error("El servicio actualmente no esta disponible");
      return;
    }
    const { statusCode, message } = axiosError.response.data;
    const fieldValue = extractValueFromParentheses(message);
    if (statusCode === 401 && fieldValue === "email") {
      formLogin.setError("email", {
        message: "El usuario ingresado no existe",
      });
    } else {
      formLogin.setError("password", {
        message: "La contraseña es incorrecta",
      });
    }
  };

  // Acción a ejecutar en caso de error en el Login
  useEffect(() => {
    if (isError) {
      handleLoginError(error);
    }
  }, [isError, error]);

  // Control de visibilidad del campo de contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Modificar la visibilidad de la contraseña
  const togglePasswordVisibility = (event: any) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return {
    formLogin,
    data,
    isPending,
    isSuccess,
    showPassword,
    togglePasswordVisibility,
    // saveUserInLocalStorage,
    mutate,
    isError,
    error,
  };
};
