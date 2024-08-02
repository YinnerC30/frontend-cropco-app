import { CustomFormField } from "@/modules/core/interfaces/CustomFormField";

export const formFieldsHarvest: Record<string, CustomFormField> = {
  date: {
    name: "date",
    label: "Fecha:",
    placeholder: "Selecciona una fecha",
    description: "Fecha en la que se realizo la cosecha",
  },
  crop: {
    name: "crop",
    label: "Cultivo:",
    placeholder: "Selecciona un cultivo",
    description:
      "Selecciona el nombre del cultivo al cual se le realizo la cosecha",
  },

  total: {
    name: "total",
    label: "Total:",
    placeholder: "",
    description: "",
  },
  value_pay: {
    name: "value_pay",
    label: "Valor a pagar:",
    placeholder: "",
    description: "",
  },
  observation: {
    name: "observation",
    label: "Observación:",
    placeholder: "Se cosecho hasta...",
    description: "",
  },
};
