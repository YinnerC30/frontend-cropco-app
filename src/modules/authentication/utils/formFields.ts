import { CustomFormField } from "@/modules/core/interfaces/CustomFormField";

export const formFields: Record<string, CustomFormField> = {
  email: {
    name: "email",
    label: "Correo electrónico:",
    placeholder: "stivgome@google.com",
    description: "Su correo electrónico personal",
  },

  password: {
    name: "password",
    label: "Contraseña:",
    placeholder: "",
    description: "La contraseña de su cuenta",
  },
};
