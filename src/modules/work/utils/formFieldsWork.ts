import { CustomFormField } from "@/modules/core/interfaces/CustomFormField";

export const formFieldsWork: Record<string, CustomFormField> = {
  date: {
    name: "date",
    label: "Fecha:",
    placeholder: "Selecciona una fecha",
    description: "Fecha en la que se realizo la venta",
  },
  description: {
    name: "description",
    label: "Descripción:",
    placeholder: "Se realizo limpieza, fumigación...",
    description: "Alguna descripción sobre el trabajo realizado",
  },
  crop: {
    name: "crop",
    label: "Cultivo:",
    placeholder: "Selecciona un cultivo",
    description: "",
  },
  total: {
    name: "total",
    label: "Total a pagar:",
    placeholder: "",
    description: "Dinero total a pagar por el trabajo",
  },
};
