import { CustomFormField } from "@/modules/core/interfaces/Form/CustomFormField";

export const formFieldsLogin: Record<string, CustomFormField> = {
  email: {
    name: "email",
    label: "Correo electrónico:",
    placeholder: "email@google.com",
    description: "Su correo electrónico personal",
  },

  password: {
    name: "password",
    label: "Contraseña:",
    placeholder: "",
    description: "La contraseña de su cuenta",
  },
};
