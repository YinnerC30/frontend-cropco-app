import { CustomFormField } from "@/modules/core/interfaces/CustomFormField";

export const formFields: Record<string, CustomFormField> = {
  date: {
    name: "date",
    label: "Fecha:",
    placeholder: "Selecciona una fecha",
    description: "Fecha en la que se realizo el consumo",
  },
};
