import { CustomFormField } from "@/modules/core/interfaces/CustomFormField";

export const formFields: Record<string, CustomFormField> = {
  date: {
    name: "date",
    label: "Fecha:",
    placeholder: "Selecciona una fecha",
    description: "Fecha en la que se realizo la compra",
  },
  total: {
    name: "total",
    label: "Total:",
    placeholder: "0",
    description: "Total a pagar por la compra",
  },
};