import { CustomFormField } from "@/modules/core/interfaces/CustomFormField";

export const formFieldsHarvestDetail: Record<string, CustomFormField> = {
  first_name: {
    name: "first_name",
    label: "Empleado:",
    placeholder: "Selecciona",
    description: "Selecciona el nombre del empleado",
  },
  total: {
    name: "total",
    label: "Total:",
    placeholder: "",
    description: "Introduce la cantidad que ha cosechado",
  },
  value_pay: {
    name: "value_pay",
    label: "Valor a pagar:",
    placeholder: "",
    description: "Introduce el valor a pagar por la cosecha",
  },
};
